import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, Settings, BookOpen, Home, Clock } from "lucide-react"; // Added more icons
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
    <header className="w-full bg-background border-b border-border shadow-md sticky top-0 z-50"> {/* Changed shadow to shadow-md */}
      {/* Banner/Logo Section */}
      <div className="w-full overflow-hidden"> {/* Added overflow-hidden for rounded corners */}
        <img 
          src={bannerImageUrl}
          alt="المعافر - أتمنى أسيب علامة تشفع لي يوم القيامة"
          className="w-full h-auto max-h-40 object-cover object-center rounded-b-lg shadow-lg" // Increased max-h, added object-center, rounded-b-lg, shadow-lg
        />
      </div>
      
      {/* Navigation Section */}
      <div className="container mx-auto px-4 py-4"> {/* Increased vertical padding */}
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" // Changed size to icon for a square button
            className="md:hidden text-foreground hover:bg-secondary/50 transition-colors" // Added hover effect
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" /> {/* Larger icon */}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse"> {/* Increased space-x */}
            <NavLink to="/" icon={<Home className="h-5 w-5" />} label="الرئيسية" />
            <NavLink to="/pomodoro" icon={<Clock className="h-5 w-5" />} label="البومودورو" />
            <NavLink to="/about" icon={<User className="h-5 w-5" />} label="من هو المعافر" />
            <NavLink to="/articles" icon={<BookOpen className="h-5 w-5" />} label="المقالات" />
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4"> {/* Changed space-x to gap */}
            {/* Login/User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="gap-2 rounded-full px-5 py-2 text-base font-medium shadow-sm hover:shadow-md transition-all duration-300"> {/* Larger, rounded, shadowed button */}
                  <User className="h-5 w-5" /> {/* Larger icon */}
                  <span className="hidden sm:inline">
                    {user ? user.user_metadata?.display_name || user.email : 'الحساب'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 p-2 shadow-lg rounded-lg"> {/* Wider, more padding, shadow, rounded */}
                {!user ? (
                  <DropdownMenuItem className="gap-3 cursor-pointer py-2 px-3 rounded-md hover:bg-secondary transition-colors"> {/* Added padding, rounded, hover effect */}
                    <Link to="/auth" className="flex items-center gap-3 w-full">
                      <User className="h-5 w-5 text-primary" /> {/* Larger icon, primary color */}
                      تسجيل الدخول
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem className="gap-3 py-2 px-3 rounded-md" disabled>
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span className="truncate">{user.user_metadata?.display_name || user.email}</span> {/* Truncate long names */}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" /> {/* More vertical space */}
                    {userRole === 'admin' && (
                      <DropdownMenuItem className="gap-3 cursor-pointer py-2 px-3 rounded-md hover:bg-secondary transition-colors">
                        <Link to="/admin" className="flex items-center gap-3 w-full">
                          <Settings className="h-5 w-5 text-primary" />
                          لوحة التحكم
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="gap-3 cursor-pointer py-2 px-3 rounded-md hover:bg-secondary transition-colors">
                      <Settings className="h-5 w-5 text-primary" />
                      الإعدادات
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-3 text-destructive cursor-pointer py-2 px-3 rounded-md hover:bg-destructive/10 transition-colors" onClick={handleLogout}> {/* Destructive hover */}
                      <LogOut className="h-5 w-5" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button asChild className="bg-accent hover:bg-red-dark text-accent-foreground font-bold inline-flex items-center justify-center rounded-full px-6 py-2 text-base shadow-md hover:shadow-lg transition-all duration-300"> {/* Larger, bolder, rounded, shadowed button */}
              <Link to="/">
                انضم للبث المباشر
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background absolute left-0 right-0 top-full shadow-lg rounded-b-lg animate-accordion-down"> {/* Added absolute positioning, shadow, rounded, animation */}
            <div className="px-4 py-4 space-y-3"> {/* Increased padding and space-y */}
              <MobileNavLink to="/" label="الرئيسية" icon={<Home className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/pomodoro" label="البومودورو" icon={<Clock className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/about" label="من هو المعافر" icon={<User className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/articles" label="المقالات" icon={<BookOpen className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)} />
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border mt-4"> {/* Increased padding and margin-top */}
                {user ? (
                  <div className="space-y-3">
                    <p className="text-base text-muted-foreground font-medium">
                      مرحباً، <span className="text-foreground font-semibold">{user.user_metadata?.display_name || user.email}</span>
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full gap-3 text-base py-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      تسجيل الخروج
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-3 text-base py-2 rounded-md hover:bg-secondary transition-colors">
                      <User className="h-5 w-5" />
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

// Helper component for desktop navigation links
const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <Link 
    to={to} 
    className="group flex items-center gap-2 text-foreground hover:text-accent transition-all duration-200 font-medium text-lg relative py-1"
  >
    {icon}
    <span>{label}</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span> {/* Underline effect */}
  </Link>
);

// Helper component for mobile navigation links
const MobileNavLink = ({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick: () => void }) => (
  <Link 
    to={to} 
    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors font-medium text-lg py-2 px-3 rounded-md hover:bg-secondary"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Header;
