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
import { motion, AnimatePresence } from "framer-motion"; // استيراد Framer Motion

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

  // Framer Motion Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { x: "100%", transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-50"
    >
      {/* Banner/Logo Section */}
      <div className="w-full">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          src={bannerImageUrl}
          alt="المعافر - أتمنى أسيب علامة تشفع لي يوم القيامة"
          className="w-full h-auto max-h-32 object-cover"
        />
      </div>

      {/* Navigation Section */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {[
              { path: "/", label: "الرئيسية" },
              { path: "/pomodoro", label: "البومودورو" },
              { path: "/about", label: "من هو المعافر" },
              { path: "/articles", label: "المقالات" },
            ].map((item, index) => (
              <motion.div
                key={item.path}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05, color: 'hsl(var(--accent))' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.path} className="text-foreground hover:text-accent transition-colors font-medium">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Login/User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {user ? user.user_metadata?.display_name || user.email : 'الحساب'}
                    </span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {!user ? (
                  <motion.div variants={dropdownItemVariants} initial="hidden" animate="visible">
                    <DropdownMenuItem className="gap-2">
                      <Link to="/auth" className="flex items-center gap-2 w-full">
                        <User className="h-4 w-4" />
                        تسجيل الدخول
                      </Link>
                    </DropdownMenuItem>
                  </motion.div>
                ) : (
                  <>
                    <motion.div variants={dropdownItemVariants} initial="hidden" animate="visible">
                      <DropdownMenuItem className="gap-2" disabled>
                        <User className="h-4 w-4" />
                        {user.user_metadata?.display_name || user.email}
                      </DropdownMenuItem>
                    </motion.div>
                    <DropdownMenuSeparator />
                    {userRole === 'admin' && (
                      <motion.div variants={dropdownItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                        <DropdownMenuItem className="gap-2">
                          <Link to="/admin" className="flex items-center gap-2 w-full">
                            <Settings className="h-4 w-4" />
                            لوحة التحكم
                          </Link>
                        </DropdownMenuItem>
                      </motion.div>
                    )}
                    <motion.div variants={dropdownItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        الإعدادات
                      </DropdownMenuItem>
                    </motion.div>
                    <motion.div variants={dropdownItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                      <DropdownMenuItem className="gap-2 text-destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        تسجيل الخروج
                      </DropdownMenuItem>
                    </motion.div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium inline-flex items-center justify-center rounded-md px-4 py-2 text-sm transition-colors">
                انضم للبث المباشر
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden border-t border-border bg-background absolute w-full left-0 top-full z-40" // Added absolute positioning and z-index
            >
              <div className="px-4 py-3 space-y-3">
                {[
                  { path: "/", label: "الرئيسية" },
                  { path: "/pomodoro", label: "البومودورو" },
                  { path: "/about", label: "من هو المعافر" },
                  { path: "/articles", label: "المقالات" },
                ].map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.05 + index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className="block text-foreground hover:text-accent transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth */}
                <div className="pt-3 border-t border-border">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        مرحباً، {user.user_metadata?.display_name || user.email}
                      </p>
                      <motion.div whileTap={{ scale: 0.98 }}>
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
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full gap-2">
                          <User className="h-4 w-4" />
                          تسجيل الدخول
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
