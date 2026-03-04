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
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  lead_source: string | null;
  timeline: string | null;
  budget: string | null;
  has_agent: string | null;
  status: string;
  is_paid: boolean | null;
  created_at: string;
  utm_source: string | null;
  utm_campaign: string | null;
  preferred_call_date: string | null;
  preferred_call_time: string | null;
}

const leadTypeLabels: Record<string, { label: string; icon: typeof Home; color: string }> = {
  "buy-presale": { label: "Buyer", icon: Home, color: "text-blue-500 bg-blue-500/10" },
  "sell-assignment": { label: "Seller", icon: ArrowRightLeft, color: "text-purple-500 bg-purple-500/10" },
  "paid-advice": { label: "Paid Advice", icon: MessageCircle, color: "text-amber-500 bg-amber-500/10" },
  "first-time-buyer": { label: "First-Time", icon: User, color: "text-green-500 bg-green-500/10" },
  "investor": { label: "Investor", icon: DollarSign, color: "text-cyan-500 bg-cyan-500/10" },
};

const statusOptions = [
  { value: "new", label: "New", icon: Clock, color: "text-blue-500 bg-blue-500/10" },
  { value: "contacted", label: "Contacted", icon: Phone, color: "text-yellow-500 bg-yellow-500/10" },
  { value: "qualified", label: "Qualified", icon: CheckCircle, color: "text-green-500 bg-green-500/10" },
  { value: "closed", label: "Closed", icon: CheckCircle, color: "text-primary bg-primary/10" },
  { value: "lost", label: "Lost", icon: XCircle, color: "text-red-500 bg-red-500/10" },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

function isNew(dateStr: string) {
  const hrs = (Date.now() - new Date(dateStr).getTime()) / 3600000;
  return hrs < 48;
}

const AdminLeads = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) fetchLeads();
  }, [isAdmin]);

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch leads", variant: "destructive" });
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", leadId);
    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      toast({ title: "Status Updated", description: `Lead marked as ${newStatus}` });
      fetchLeads();
    }
  };

  const deleteLead = async (leadId: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", leadId);
    if (error) {
      toast({ title: "Error", description: "Failed to delete lead", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Lead removed." });
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  const exportLeads = () => {
    const filteredData = getFilteredLeads();
    const csv = [
      ["Name", "Email", "Phone", "Type", "Timeline", "Budget", "Has Agent", "Status", "Source", "UTM Source", "UTM Campaign", "Date"].join(","),
      ...filteredData.map((lead) =>
        [
          `"${lead.first_name} ${lead.last_name}"`,
          lead.email,
          lead.phone,
          lead.buyer_type,
          lead.timeline || "",
          lead.budget || "",
          lead.has_agent || "",
          lead.status,
          lead.lead_source || "",
          lead.utm_source || "",
          lead.utm_campaign || "",
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      </div>
    );
  }

  const filteredLeads = getFilteredLeads();
  const recentLeads = filteredLeads.filter((l) => isNew(l.created_at));
  const olderLeads = filteredLeads.filter((l) => !isNew(l.created_at));

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
  };

  const LeadCard = ({ lead }: { lead: Lead }) => {
    const typeInfo = leadTypeLabels[lead.buyer_type] || { label: lead.buyer_type, icon: User, color: "text-muted-foreground bg-muted" };
    const TypeIcon = typeInfo.icon;
    const statusInfo = statusOptions.find((s) => s.value === lead.status) || statusOptions[0];
    const StatusIcon = statusInfo.icon;
    const fresh = isNew(lead.created_at);

    return (
      <div className={`bg-card rounded-xl border p-4 md:p-5 transition-all ${fresh ? "border-primary/40 shadow-sm shadow-primary/10" : "border-border"}`}>
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            {/* Name + badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {fresh && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
                  <Sparkles className="h-3 w-3" />
                  NEW
                </span>
              )}
              <h3 className="font-semibold text-foreground text-base">
                {lead.first_name} {lead.last_name}
              </h3>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>
                <TypeIcon className="h-3 w-3" />
                {typeInfo.label}
              </span>
              {lead.is_paid && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-green-600 bg-green-500/10">
                  <DollarSign className="h-3 w-3" />
                  Paid
                </span>
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {lead.email}
              </a>
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {lead.phone}
              </a>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {timeAgo(lead.created_at)}
              </span>
            </div>

            {/* Meta tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              {lead.timeline && (
                <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  ⏱ {lead.timeline.replace(/-/g, " ")}
                </span>
              )}
              {lead.budget && (
                <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  💰 {lead.budget.replace(/-/g, " ")}
                </span>
              )}
              {lead.has_agent && (
                <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  Agent: {lead.has_agent}
                </span>
              )}
              {lead.preferred_call_date && (
                <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  📅 {lead.preferred_call_date} {lead.preferred_call_time && `@ ${lead.preferred_call_time}`}
                </span>
              )}
              {lead.lead_source && (
                <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  📍 {lead.lead_source.replace(/-/g, " ")}
                </span>
              )}
              {lead.utm_source && (
                <span className="px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  UTM: {lead.utm_source}{lead.utm_campaign ? ` / ${lead.utm_campaign}` : ""}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 text-xs ${statusInfo.color}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" />
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
                    <status.icon className={`h-4 w-4 ${status.color.split(" ")[0]}`} />
                    {status.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete lead?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove <strong>{lead.first_name} {lead.last_name}</strong> from your leads. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteLead(lead.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
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
              <div>
                <h1 className="font-display text-xl font-bold text-foreground leading-tight">Leads</h1>
                <p className="text-xs text-muted-foreground">{stats.total} total · {stats.new} new</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchLeads} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" onClick={exportLeads} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => signOut()}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container-xl py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Total Leads</div>
            </div>
            <div className="bg-card rounded-xl border border-primary/30 p-4">
              <div className="text-2xl font-bold text-primary">{stats.new}</div>
              <div className="text-xs text-muted-foreground mt-0.5">New</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-yellow-500">{stats.contacted}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Contacted</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="text-2xl font-bold text-green-500">{stats.qualified}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Qualified</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email, phone…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="h-4 w-4 mr-2 shrink-0" />
                <SelectValue placeholder="Type" />
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
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Leads */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">
                {leads.length === 0 ? "No leads yet." : "No leads match your filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {recentLeads.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground">Recent (last 48h)</h2>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{recentLeads.length}</span>
                  </div>
                  {recentLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
                </div>
              )}

              {olderLeads.length > 0 && (
                <div className="space-y-3">
                  {recentLeads.length > 0 && (
                    <h2 className="text-sm font-semibold text-muted-foreground">Older</h2>
                  )}
                  {olderLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminLeads;
