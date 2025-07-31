import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin, Award, Heart, Target } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from 'react-countup'; // استيراد react-countup
import { useInView } from "react-intersection-observer"; // لاستخدام useInView

// مكون لعداد متحرك
const AnimatedCounter = ({ end, duration, suffix = "", prefix = "" }: { end: number, duration: number, suffix?: string, prefix?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // يشغل مرة واحدة فقط عند الدخول في مجال الرؤية
    threshold: 0.5,    // يشغل عندما يكون 50% من العنصر مرئياً
  });

  return (
    <div ref={ref} className="text-3xl font-bold text-accent">
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          separator=""
          suffix={suffix}
          prefix={prefix}
        />
      ) : (
        `${prefix}${end}${suffix}` // عرض القيمة النهائية إذا لم يكن مرئياً بعد
      )}
    </div>
  );
};

const About = () => {
  // Framer Motion Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren", // يشغل قبل ظهور العناصر الداخلية
        staggerChildren: 0.2, // تأخير بين ظهور العناصر الفرعية
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <User className="h-16 w-16 text-accent" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-title font-bold mb-4 text-foreground">
              من هو <span className="text-accent">المعافر</span>؟
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              "أتمنى أسيب علامة تشفع لي يوم القيامة"
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* About Content */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="md:col-span-2 space-y-6"
            >
              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-title flex items-center gap-2">
                      <Heart className="h-6 w-6 text-accent" />
                      قصة المعافر
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-foreground leading-relaxed">
                    <p>
                      بدأت رحلة المعافر من رغبة صادقة في المساعدة والتأثير الإيجابي في مجتمع الطلاب العرب.
                      اسم "المعافر" مستوحى من القبيلة العربية العريقة، والتي تعني القوة والشجاعة والصمود.
                    </p>
                    <p>
                      الهدف من هذا المشروع ليس مجرد قناة يوتيوب أو موقع إلكتروني، بل هو مجتمع داعم
                      يجمع الطلاب من جميع أنحاء الوطن العربي لمشاركة رحلة التعلم والنجاح.
                    </p>
                    <p>
                      "أتمنى أسيب علامة تشفع لي يوم القيامة" - هذه الجملة ليست مجرد شعار، بل هي
                      الدافع الحقيقي وراء كل محتوى ننتجه وكل خدمة نقدمها. نؤمن أن العلم والمعرفة
                      من أعظم الصدقات الجارية.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-title flex items-center gap-2">
                      <Target className="h-6 w-6 text-accent" />
                      رؤيتنا ورسالتنا
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-accent">الرؤية</h3>
                      <p className="text-foreground">
                        أن نكون المنصة الأولى للمذاكرة الجماعية والتحفيز في الوطن العربي،
                        ونساهم في بناء جيل متعلم ومثقف يحمل قيم الإسلام والعروبة.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-accent">الرسالة</h3>
                      <p className="text-foreground">
                        نقدم بيئة داعمة ومحفزة للطلاب من خلال البث المباشر وتقنيات الدراسة الحديثة،
                        مع التركيز على القيم الأخلاقية والروحانية في رحلة التعلم.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Stats & Info Sidebar */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-title">معلومات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-accent" />
                      <div>
                        <div className="font-medium">تاريخ البداية</div>
                        <div className="text-sm text-muted-foreground">٢٠٢٤</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <div>
                        <div className="font-medium">المنطقة</div>
                        <div className="text-sm text-muted-foreground">الوطن العربي</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-accent" />
                      <div>
                        <div className="font-medium">التخصص</div>
                        <div className="text-sm text-muted-foreground">Study With Me</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-title flex items-center gap-2">
                      <Award className="h-5 w-5 text-accent" />
                      إنجازاتنا
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <AnimatedCounter end={1000} duration={2} suffix="+" />
                      <div className="text-sm text-muted-foreground">طالب نشط</div>
                    </div>
                    <div className="text-center">
                      <AnimatedCounter end={500} duration={2} suffix="+" />
                      <div className="text-sm text-muted-foreground">ساعة بث مباشر</div>
                    </div>
                    <div className="text-center">
                      <AnimatedCounter end={20} duration={2} suffix="+" />
                      <div className="text-sm text-muted-foreground">مقال تعليمي</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-title">قيمنا</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["العلم النافع", "التعاون والمشاركة", "الإخلاص في العمل", "التطوير المستمر"].map((value, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.03 }} variants={itemVariants}>
                          <Badge variant="secondary" className="w-full justify-center py-2 text-base">
                            {value}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Quote Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-accent/5 border border-accent/20 rounded-lg p-8 text-center mb-12 shadow-md"
          >
            <motion.blockquote variants={itemVariants} className="text-2xl font-medium text-foreground mb-4">
              "إن الله وملائكته والناس في السماوات والأرض، حتى النملة في جحرها،
              وحتى الحوت، ليصلون على معلم الناس الخير"
            </motion.blockquote>
            <motion.p variants={itemVariants} className="text-accent font-medium">- الحديث الشريف</motion.p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mt-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-title font-bold mb-4 text-foreground">
              انضم إلى مجتمع المعافر
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-6">
              كن جزءاً من رحلة التعلم والنمو مع آلاف الطلاب
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              >
                ابدأ المذاكرة الآن
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                href="/articles"
                className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-medium hover:bg-muted transition-colors"
              >
                تصفح المقالات
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
