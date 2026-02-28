import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Loader2,
  LogOut,
  Search,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  User,
  Home,
  ArrowRightLeft,
  MessageCircle,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  buyer_type: string;
  lead_source: string;
  timeline: string | null;
  budget: string | null;
  status: string;
  is_paid: boolean | null;
  created_at: string;
}

const leadTypeLabels: Record<string, { label: string; icon: typeof Home; color: string }> = {
  "buy-presale": { label: "Buyer", icon: Home, color: "text-primary bg-primary/15" },
  "sell-assignment": { label: "Seller", icon: ArrowRightLeft, color: "text-primary bg-primary/10" },
  "paid-advice": { label: "Paid Advice", icon: MessageCircle, color: "text-primary bg-primary/20" },
  "first-time-buyer": { label: "First-Time", icon: User, color: "text-primary bg-primary/15" },
  "investor": { label: "Investor", icon: DollarSign, color: "text-primary bg-primary/10" },
};

const statusOptions = [
  { value: "new", label: "New", icon: Clock, color: "text-foreground bg-muted" },
  { value: "contacted", label: "Contacted", icon: Phone, color: "text-primary bg-primary/10" },
  { value: "qualified", label: "Qualified", icon: CheckCircle, color: "text-primary bg-primary/20" },
  { value: "closed", label: "Closed", icon: CheckCircle, color: "text-primary bg-primary/10" },
  { value: "lost", label: "Lost", icon: XCircle, color: "text-destructive bg-destructive/10" },
];

const AdminLeads = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchLeads();
    }
  }, [isAdmin]);

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Lead marked as ${newStatus}`,
      });
      fetchLeads();
    }
  };

  const exportLeads = () => {
    const filteredData = getFilteredLeads();
    const csv = [
      ["Name", "Email", "Phone", "Type", "Timeline", "Budget", "Status", "Source", "Date"].join(","),
      ...filteredData.map((lead) =>
        [
          `"${lead.first_name} ${lead.last_name}"`,
          lead.email,
          lead.phone,
          lead.buyer_type,
          lead.timeline || "",
          lead.budget || "",
          lead.status,
          lead.lead_source,
          new Date(lead.created_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getFilteredLeads = () => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const matchesType = typeFilter === "all" || lead.buyer_type === typeFilter;
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges.
          </p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

  const filteredLeads = getFilteredLeads();
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
  };

  return (
    <>
      <Helmet>
        <title>Leads Dashboard | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card border-b border-border">
          <div className="container-xl py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-display text-xl font-bold text-foreground">
                Leads Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={fetchLeads} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" onClick={exportLeads} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container-xl py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-primary">{stats.new}</div>
              <div className="text-sm text-muted-foreground">New</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-primary">{stats.contacted}</div>
              <div className="text-sm text-muted-foreground">Contacted</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-primary">{stats.qualified}</div>
              <div className="text-sm text-muted-foreground">Qualified</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lead Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy-presale">Buyers</SelectItem>
                <SelectItem value="sell-assignment">Sellers</SelectItem>
                <SelectItem value="paid-advice">Paid Advice</SelectItem>
                <SelectItem value="first-time-buyer">First-Time</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Leads List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">
                {leads.length === 0 ? "No leads yet." : "No leads match your filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => {
                const typeInfo = leadTypeLabels[lead.buyer_type] || {
                  label: lead.buyer_type,
                  icon: User,
                  color: "text-muted-foreground bg-muted",
                };
                const TypeIcon = typeInfo.icon;
                const statusInfo = statusOptions.find((s) => s.value === lead.status) || statusOptions[0];
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={lead.id}
                    className="bg-card rounded-xl border border-border p-4 md:p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Lead Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-foreground">
                            {lead.first_name} {lead.last_name}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>
                            <TypeIcon className="h-3 w-3" />
                            {typeInfo.label}
                          </span>
                          {lead.is_paid && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-primary bg-primary/15">
                              <DollarSign className="h-3 w-3" />
                              Paid
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary">
                            <Mail className="h-3.5 w-3.5" />
                            {lead.email}
                          </a>
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-primary">
                            <Phone className="h-3.5 w-3.5" />
                            {lead.phone}
                          </a>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(lead.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        {(lead.timeline || lead.budget) && (
                          <div className="flex flex-wrap gap-2 text-xs">
                            {lead.timeline && (
                              <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                                Timeline: {lead.timeline.replace(/-/g, " ")}
                              </span>
                            )}
                            {lead.budget && (
                              <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                                Budget: {lead.budget.replace(/-/g, " ")}
                              </span>
                            )}
                            {lead.lead_source && (
                              <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                                Source: {lead.lead_source}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className={`gap-2 ${statusInfo.color.replace('bg-', 'border-').replace('/10', '/30')}`}>
                              <StatusIcon className="h-4 w-4" />
                              {statusInfo.label}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {statusOptions.map((status) => (
                              <DropdownMenuItem
                                key={status.value}
                                onClick={() => updateLeadStatus(lead.id, status.value)}
                                className="gap-2"
                              >
                                <status.icon className={`h-4 w-4 ${status.color.split(' ')[0]}`} />
                                {status.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminLeads;
