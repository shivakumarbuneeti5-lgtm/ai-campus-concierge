import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface InfoModuleProps {
  title: string;
  icon: LucideIcon;
  description: string;
  items: Array<{
    title: string;
    subtitle: string;
    status?: string;
    time?: string;
  }>;
  primaryColor: "blue" | "orange" | "green";
}

const colorClasses = {
  blue: {
    gradient: "bg-gradient-to-br from-campus-blue to-campus-blue-dark",
    accent: "text-campus-blue",
    badge: "bg-campus-blue-light text-campus-blue-dark",
    button: "bg-campus-blue hover:bg-campus-blue-dark"
  },
  orange: {
    gradient: "bg-gradient-to-br from-accent to-orange-600",
    accent: "text-accent",
    badge: "bg-accent-light text-accent-foreground",
    button: "bg-accent hover:bg-orange-600"
  },
  green: {
    gradient: "bg-gradient-to-br from-success to-green-600",
    accent: "text-success",
    badge: "bg-green-100 text-success",
    button: "bg-success hover:bg-green-600"
  }
};

export function InfoModule({ title, icon: Icon, description, items, primaryColor }: InfoModuleProps) {
  const colors = colorClasses[primaryColor];

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className={`${colors.gradient} text-white rounded-t-lg`}>
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-white/90 text-sm mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.time && (
                  <span className={`text-sm font-medium ${colors.accent}`}>
                    {item.time}
                  </span>
                )}
                {item.status && (
                  <Badge variant="secondary" className={colors.badge}>
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button className={`w-full mt-4 ${colors.button} text-white`}>
          View All {title}
        </Button>
      </CardContent>
    </Card>
  );
}