import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Building2, MapPin, User } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  developer: string;
  city: string;
  propertyType: string; // "Condo" | "Townhome" | etc.
  image?: string;
  priceFrom?: string;
  status?: string;
}

interface ProjectGridProps {
  city?: string;
  projects?: Project[];
  apiUrl?: string;
  limit?: number;
}

const PLACEHOLDER_PROJECTS: Project[] = [
  { id: "1", name: "The Timber", developer: "Ledingham McAllister", city: "Surrey", propertyType: "Condo", priceFrom: "From $499,900", status: "Now Selling" },
  { id: "2", name: "Parkway 2", developer: "Concord Pacific", city: "Surrey", propertyType: "Condo", priceFrom: "From $549,900", status: "Coming Soon" },
  { id: "3", name: "Highpoint", developer: "Anthem Properties", city: "Langley", propertyType: "Townhome", priceFrom: "From $749,900", status: "Now Selling" },
  { id: "4", name: "The Oaks", developer: "Mosaic Homes", city: "Langley", propertyType: "Townhome", priceFrom: "From $899,900", status: "Now Selling" },
  { id: "5", name: "Skyline", developer: "Aquilini", city: "Abbotsford", propertyType: "Condo", priceFrom: "From $399,900", status: "Coming Soon" },
  { id: "6", name: "Riverside", developer: "Pollyco", city: "Abbotsford", propertyType: "Townhome", priceFrom: "From $649,900", status: "Now Selling" },
  { id: "7", name: "Valley View", developer: "Wesgroup", city: "Chilliwack", propertyType: "Condo", priceFrom: "From $349,900", status: "Coming Soon" },
  { id: "8", name: "Eagle Ridge", developer: "Wanson Group", city: "Maple Ridge", propertyType: "Townhome", priceFrom: "From $699,900", status: "Now Selling" },
];

export const ProjectGrid = ({ city, projects: externalProjects, apiUrl, limit }: ProjectGridProps) => {
  const [projects, setProjects] = useState<Project[]>(externalProjects || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (externalProjects) {
      setProjects(externalProjects);
      return;
    }

    if (apiUrl) {
      setIsLoading(true);
      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch projects");
          return res.json();
        })
        .then((data) => setProjects(data))
        .catch((err) => {
          console.error("ProjectGrid fetch error:", err);
          setError("Unable to load projects. Please try again later.");
          setProjects(PLACEHOLDER_PROJECTS);
        })
        .finally(() => setIsLoading(false));
    } else {
      setProjects(PLACEHOLDER_PROJECTS);
    }
  }, [apiUrl, externalProjects]);

  const filtered = city
    ? projects.filter((p) => p.city.toLowerCase() === city.toLowerCase())
    : projects;

  const displayed = limit ? filtered.slice(0, limit) : filtered;

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

  if (error && displayed.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{error}</p>
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

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayed.map((project) => (
        <div
          key={project.id}
          className="group rounded-2xl overflow-hidden border border-border bg-card hover-lift"
        >
          {/* Image placeholder */}
          <div className="aspect-[16/10] overflow-hidden bg-muted relative">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.name} by ${project.developer}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                <Building2 className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}
            {/* Status badge */}
            {project.status && (
              <span
                className="absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-sm backdrop-blur-sm"
                style={{
                  background: project.status === "Now Selling"
                    ? "hsl(var(--primary) / 0.9)"
                    : "hsl(var(--muted) / 0.9)",
                  color: project.status === "Now Selling"
                    ? "hsl(var(--primary-foreground))"
                    : "hsl(var(--foreground))",
                }}
              >
                {project.status}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <User className="h-3.5 w-3.5" />
              {project.developer}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5" />
              {project.city} · {project.propertyType}
            </div>
            {project.priceFrom && (
              <p className="text-sm font-semibold text-foreground mb-4">{project.priceFrom}</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
              onClick={handleVIPClick}
            >
              Get VIP Access
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
