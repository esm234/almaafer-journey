import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  // Using the uploaded banner image
  const bannerImageUrl = "/lovable-uploads/1b1f72f9-e6e6-4947-b0d7-6930c270be53.png";

  return (
    <header className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-50">
      {/* Banner/Logo Section */}
      <div className="w-full">
        <img 
          src={bannerImageUrl}
          alt="المعافر - أتمنى أسيب علامة تشفع لي يوم القيامة"
          className="w-full h-auto max-h-32 object-cover"
        />
      </div>
      
      {/* Navigation Section */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <a href="/" className="text-foreground hover:text-accent transition-colors font-medium">
              الرئيسية
            </a>
            <a href="/pomodoro" className="text-foreground hover:text-accent transition-colors font-medium">
              البومودورو
            </a>
            <a href="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              من هو المعافر
            </a>
            <a href="/articles" className="text-foreground hover:text-accent transition-colors font-medium">
              المقالات
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Login/User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">الحساب</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="gap-2">
                  <a href="/auth" className="flex items-center gap-2 w-full">
                    <User className="h-4 w-4" />
                    تسجيل الدخول
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <a href="/" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium inline-flex items-center justify-center rounded-md px-4 py-2 text-sm transition-colors">
              انضم للبث المباشر
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;