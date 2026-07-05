import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, User, Loader2 } from "lucide-react";
import { usePresaleProjects, PresaleProject } from "@/hooks/usePresaleProjects";

interface ProjectGridProps {
  city?: string;
  limit?: number;
}

export const ProjectGrid = ({ city, limit }: ProjectGridProps) => {
  const { data: projects, isLoading, error } = usePresaleProjects(city);

  const displayed = limit ? (projects || []).slice(0, limit) : (projects || []);

  const handleVIPClick = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Unable to load projects. Please try again later.</p>
      </div>
    );
  }

  if (displayed.length === 0) {
    return (
      <div className="text-center py-16">
        <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="font-display text-xl text-foreground mb-2">No projects available</p>
        <p className="text-sm text-muted-foreground">
          New {city || "Fraser Valley"} presales are added regularly. Get notified first.
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={handleVIPClick}
        >
          Get VIP Access
        </Button>
      </div>
    );
  }

  const formatPrice = (price: number | null) => {
    if (!price || price < 200000) return "Pricing on request";
    return `From $${price.toLocaleString()}`;
  };

  const getStatusLabel = (project: PresaleProject) => {
    if (project.status === "active") return "Now Selling";
    if (project.status === "coming_soon") return "Coming Soon";
    if (project.status === "sold_out") return "Sold Out";
    return project.status;
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayed.map((project) => (
        <div
          key={project.id}
          className="group rounded-2xl overflow-hidden border border-border bg-card hover-lift"
        >
          {/* Image */}
          <div className="aspect-[16/10] overflow-hidden bg-muted relative">
            {project.featured_image ? (
              <img
                src={project.featured_image}
                alt={`${project.name} by ${project.developer_name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                <Building2 className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}
            {/* Status badge */}
            <span
              className="absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-sm backdrop-blur-sm"
              style={{
                background: project.status === "active"
                  ? "hsl(var(--primary) / 0.9)"
                  : "hsl(var(--muted) / 0.9)",
                color: project.status === "active"
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--foreground))",
              }}
            >
              {getStatusLabel(project)}
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            {project.developer_name && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                <User className="h-3.5 w-3.5" />
                {project.developer_name}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5" />
              {project.city}{project.project_type ? ` · ${project.project_type}` : ""}
            </div>
            {project.starting_price && (
              <p className="text-sm font-semibold text-foreground mb-4">{formatPrice(project.starting_price)}</p>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center justify-center w-full rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-sm h-9 px-3 transition-colors"
            >
              Get VIP Access
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
