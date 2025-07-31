import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Using the uploaded banner image
  const bannerImageUrl = "/lovable-uploads/1b1f72f9-e6e6-4947-b0d7-6930c270be53.png";

  useEffect(() => {
    // Check current auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Check user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        setUserRole(roleData?.role || null);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        // Check user role when auth state changes
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        setUserRole(roleData?.role || null);
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "لم يتم تسجيل الخروج",
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم تسجيل الخروج",
        description: "نراك قريباً!",
      });
      navigate('/');
    }
  };

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
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/" className="text-foreground hover:text-accent transition-colors font-medium">
              الرئيسية
            </Link>
            <Link to="/pomodoro" className="text-foreground hover:text-accent transition-colors font-medium">
              البومودورو
            </Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              من هو المعافر
            </Link>
            <Link to="/articles" className="text-foreground hover:text-accent transition-colors font-medium">
              المقالات
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Login/User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {user ? user.user_metadata?.display_name || user.email : 'الحساب'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {!user ? (
                  <DropdownMenuItem className="gap-2">
                    <Link to="/auth" className="flex items-center gap-2 w-full">
                      <User className="h-4 w-4" />
                      تسجيل الدخول
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem className="gap-2" disabled>
                      <User className="h-4 w-4" />
                      {user.user_metadata?.display_name || user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {userRole === 'admin' && (
                      <DropdownMenuItem className="gap-2">
                        <Link to="/admin" className="flex items-center gap-2 w-full">
                          <Settings className="h-4 w-4" />
                          لوحة التحكم
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="gap-2">
                      <Settings className="h-4 w-4" />
                      الإعدادات
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Link to="/" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium inline-flex items-center justify-center rounded-md px-4 py-2 text-sm transition-colors">
              انضم للبث المباشر
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 space-y-3">
              <Link 
                to="/" 
                className="block text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                to="/pomodoro" 
                className="block text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                البومودورو
              </Link>
              <Link 
                to="/about" 
                className="block text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                من هو المعافر
              </Link>
              <Link 
                to="/articles" 
                className="block text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                المقالات
              </Link>
              
              {/* Mobile Auth */}
              <div className="pt-3 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      مرحباً، {user.user_metadata?.display_name || user.email}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      تسجيل الخروج
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      تسجيل الدخول
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;