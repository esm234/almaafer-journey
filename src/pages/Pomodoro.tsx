import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [breakNote, setBreakNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const { toast } = useToast();

  // Check auth state
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Timer types
  const timerTypes = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      if (!isBreak) {
        // Work session completed
        setSessions(prev => prev + 1);
        saveSession('work', 25);
        setIsBreak(true);
        setShowNoteInput(true);
        // Start break
        const breakDuration = (sessions + 1) % 4 === 0 ? timerTypes.longBreak : timerTypes.shortBreak;
        setTimeLeft(breakDuration);
        toast({
          title: "انتهت جلسة المذاكرة!",
          description: "وقت الاستراحة الآن",
        });
      } else {
        // Break completed
        const breakDuration = timeLeft === timerTypes.longBreak ? 15 : 5;
        saveSession('break', breakDuration);
        setIsBreak(false);
        setShowNoteInput(false);
        setTimeLeft(timerTypes.work);
        toast({
          title: "انتهت الاستراحة!",
          description: "وقت العودة للمذاكرة",
        });
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, sessions]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timerTypes.work);
    setIsBreak(false);
    setShowNoteInput(false);
  };

  const setTimerType = (type: keyof typeof timerTypes) => {
    setIsActive(false);
    setTimeLeft(timerTypes[type]);
    setIsBreak(type !== 'work');
    setShowNoteInput(type !== 'work');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const saveNote = async () => {
    if (breakNote.trim() && user) {
      try {
        const { error } = await supabase
          .from('user_notes')
          .insert({
            user_id: user.id,
            content: breakNote,
            created_during_break: true
          });

        if (error) {
          console.error('Error saving note:', error);
          toast({
            title: "خطأ",
            description: "لم يتم حفظ الملاحظة",
            variant: "destructive",
          });
        } else {
          toast({
            title: "تم الحفظ",
            description: "تم حفظ ملاحظتك بنجاح",
          });
          setBreakNote("");
        }
      } catch (error) {
        console.error('Error saving note:', error);
      }
    } else if (!user) {
      // Save to localStorage if not logged in
      const notes = JSON.parse(localStorage.getItem('pomodoroNotes') || '[]');
      notes.push({
        note: breakNote,
        timestamp: new Date().toISOString(),
        session: sessions
      });
      localStorage.setItem('pomodoroNotes', JSON.stringify(notes));
      setBreakNote("");
      toast({
        title: "تم الحفظ محلياً",
        description: "سجل دخولك لحفظ الملاحظات في السحابة",
      });
    }
  };

  const saveSession = async (sessionType: string, duration: number) => {
    if (user) {
      try {
        await supabase
          .from('pomodoro_sessions')
          .insert({
            user_id: user.id,
            type: sessionType,
            duration: duration,
            notes: breakNote || null
          });
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-title font-bold mb-4 text-foreground">
              مؤقت البومودورو
            </h1>
            <p className="text-xl text-muted-foreground">
              تقنية مثبتة علمياً لزيادة التركيز والإنتاجية
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timer Section */}
            <div className="lg:col-span-2">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl font-title">
                    {isBreak ? "استراحة" : "جلسة مذاكرة"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Timer Display */}
                  <div className={`text-8xl font-mono font-bold mb-8 ${
                    isBreak ? 'text-accent' : 'text-primary'
                  }`}>
                    {formatTime(timeLeft)}
                  </div>

                  {/* Timer Controls */}
                  <div className="flex justify-center gap-4 mb-6">
                    <Button
                      onClick={toggleTimer}
                      size="lg"
                      className={`px-8 py-3 gap-2 ${
                        isBreak ? 'bg-accent hover:bg-accent/90' : ''
                      }`}
                    >
                      {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      {isActive ? "إيقاف مؤقت" : "بدء"}
                    </Button>
                    <Button onClick={resetTimer} variant="outline" size="lg" className="px-8 py-3 gap-2">
                      <RotateCcw className="h-5 w-5" />
                      إعادة تعيين
                    </Button>
                  </div>

                  {/* Timer Type Buttons */}
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Button
                      onClick={() => setTimerType('work')}
                      variant={!isBreak ? "default" : "outline"}
                      size="sm"
                    >
                      مذاكرة (٢٥ د)
                    </Button>
                    <Button
                      onClick={() => setTimerType('shortBreak')}
                      variant={isBreak && timeLeft <= 5 * 60 ? "default" : "outline"}
                      size="sm"
                    >
                      استراحة قصيرة (٥ د)
                    </Button>
                    <Button
                      onClick={() => setTimerType('longBreak')}
                      variant={isBreak && timeLeft > 5 * 60 ? "default" : "outline"}
                      size="sm"
                    >
                      استراحة طويلة (١٥ د)
                    </Button>
                  </div>

                  {/* Break Note Input */}
                  {showNoteInput && (
                    <div className="mt-8 p-4 bg-accent/10 rounded-lg border">
                      <h3 className="text-lg font-medium mb-3 text-accent">
                        اكتب ملاحظاتك أثناء الاستراحة
                      </h3>
                      <Textarea
                        value={breakNote}
                        onChange={(e) => setBreakNote(e.target.value)}
                        placeholder="اكتب ما تعلمته، أو أي أفكار مهمة..."
                        className="mb-3"
                        rows={3}
                      />
                      <Button onClick={saveNote} className="w-full">
                        حفظ الملاحظة
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Session Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-title flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    إحصائيات اليوم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">{sessions}</div>
                      <div className="text-sm text-muted-foreground">جلسات مكتملة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-foreground">
                        {Math.floor(sessions * 25 / 60)}:{(sessions * 25 % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-muted-foreground">ساعات مذاكرة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-title">نصائح البومودورو</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-muted rounded-lg">
                      <strong>٢٥ دقيقة:</strong> ركز على مهمة واحدة فقط
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <strong>٥ دقائق:</strong> استراحة قصيرة، تحرك قليلاً
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <strong>١٥ دقيقة:</strong> استراحة طويلة كل ٤ جلسات
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <strong className="text-accent">نصيحة:</strong> اكتب ملاحظاتك أثناء الاستراحة لتثبيت المعلومات
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-title">إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full gap-2">
                      <Clock className="h-4 w-4" />
                      عرض تاريخ الجلسات
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      انضم للبث المباشر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pomodoro;