import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, MousePointer, Globe, FileText, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Lead {
  id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  lead_source: string | null;
  created_at: string;
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function AdminTrafficAnalytics() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, utm_source, utm_medium, utm_campaign, referrer, landing_page, lead_source, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLeads(data);
      }
      setLoading(false);
    };

    if (user && isAdmin) {
      fetchLeads();
    }
  }, [user, isAdmin]);

  const aggregateData = (field: keyof Lead): ChartData[] => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const value = (lead[field] as string) || "Direct / Unknown";
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name: name.length > 25 ? name.slice(0, 25) + "..." : name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const getRefererDomain = (referrer: string | null): string => {
    if (!referrer) return "Direct";
    try {
      const url = new URL(referrer);
      return url.hostname.replace("www.", "");
    } catch {
      return referrer.slice(0, 30);
    }
  };

  const referrerData = (): ChartData[] => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const domain = getRefererDomain(lead.referrer);
      counts[domain] = (counts[domain] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const utmSourceData = aggregateData("utm_source");
  const utmCampaignData = aggregateData("utm_campaign");
  const utmMediumData = aggregateData("utm_medium");
  const selfReportedData = aggregateData("lead_source");
  const refData = referrerData();
  const landingPageData = aggregateData("landing_page");

  const totalLeads = leads.length;
  const leadsWithUtm = leads.filter((l) => l.utm_source || l.utm_campaign).length;
  const utmTrackingRate = totalLeads > 0 ? Math.round((leadsWithUtm / totalLeads) * 100) : 0;

  return (
    <>
      <Helmet>
        <title>Traffic Analytics | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container-xl px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Traffic Analytics</h1>
              <p className="text-muted-foreground">Lead sources and campaign performance</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalLeads}</p>
                    <p className="text-xs text-muted-foreground">Total Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MousePointer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{leadsWithUtm}</p>
                    <p className="text-xs text-muted-foreground">UTM Tracked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{utmTrackingRate}%</p>
                    <p className="text-xs text-muted-foreground">Tracking Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{refData.length}</p>
                    <p className="text-xs text-muted-foreground">Referrer Sources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* UTM Source */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  Leads by UTM Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                {utmSourceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={utmSourceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-12">No UTM source data yet</p>
                )}
              </CardContent>
            </Card>

            {/* UTM Campaign */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Leads by UTM Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                {utmCampaignData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={utmCampaignData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-12">No UTM campaign data yet</p>
                )}
              </CardContent>
            </Card>

            {/* Self-Reported Source (Pie Chart) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Self-Reported Source ("How did you find me?")</CardTitle>
              </CardHeader>
              <CardContent>
                {selfReportedData.length > 0 ? (
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width="50%" height={200}>
                      <PieChart>
                        <Pie
                          data={selfReportedData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {selfReportedData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2">
                      {selfReportedData.slice(0, 5).map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                            />
                            <span className="text-muted-foreground capitalize">{item.name}</span>
                          </div>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-12">No data yet</p>
                )}
              </CardContent>
            </Card>

            {/* Referrer Domains */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Referrer Domains
                </CardTitle>
              </CardHeader>
              <CardContent>
                {refData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={refData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" width={120} className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="value" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-12">No referrer data yet</p>
                )}
              </CardContent>
            </Card>

            {/* UTM Medium */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">UTM Medium</CardTitle>
              </CardHeader>
              <CardContent>
                {utmMediumData.length > 0 ? (
                  <div className="space-y-3">
                    {utmMediumData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-2 h-8 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-12">No UTM medium data yet</p>
                )}
              </CardContent>
            </Card>

            {/* Landing Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Landing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {landingPageData.length > 0 ? (
                  <div className="space-y-3">
                    {landingPageData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-2 h-8 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span className="text-sm text-muted-foreground font-mono">{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-12">No landing page data yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Box */}
          <Card className="mt-6 bg-muted/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>How to use UTM tracking:</strong> Add UTM parameters to your links when sharing on social media or ads. 
                Example: <code className="bg-background px-1.5 py-0.5 rounded text-xs">presalewithuzair.com?utm_source=instagram&utm_campaign=winter2026</code>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
