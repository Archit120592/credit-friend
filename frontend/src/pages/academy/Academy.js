import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import {
  School,
  PlayCircle,
  CheckCircle,
  Lock,
  EmojiEvents,
  Quiz as QuizIcon,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const modules = [
  {
    id: 1,
    title: 'Credit Analysis Fundamentals',
    description: 'Learn the basics of credit analysis and risk assessment',
    lessons: 8,
    completed: 8,
    status: 'completed',
  },
  {
    id: 2,
    title: 'Financial Ratio Analysis',
    description: 'Master DIO, DSO, DPO, CCC, and other critical ratios',
    lessons: 10,
    completed: 6,
    status: 'in_progress',
  },
  {
    id: 3,
    title: 'Risk Segmentation',
    description: 'Learn to categorize borrowers into risk buckets',
    lessons: 6,
    completed: 0,
    status: 'locked',
  },
  {
    id: 4,
    title: 'Supply Chain Finance',
    description: 'Understand SCF products and credit structures',
    lessons: 8,
    completed: 0,
    status: 'locked',
  },
];

const achievements = [
  { id: 1, title: 'First Report', description: 'Generated your first credit report', icon: '📊', earned: true },
  { id: 2, title: 'Quick Learner', description: 'Completed first academy module', icon: '📚', earned: true },
  { id: 3, title: 'Ratio Master', description: 'Perfect score on ratio quiz', icon: '🎯', earned: true },
  { id: 4, title: 'Streak Keeper', description: '7-day login streak', icon: '🔥', earned: false },
  { id: 5, title: 'Top Analyst', description: 'Generated 50 reports', icon: '🏆', earned: false },
  { id: 6, title: 'Risk Expert', description: 'Complete all academy modules', icon: '🎓', earned: false },
];

const quizQuestions = [
  {
    question: 'What does a Current Ratio of 2.0 indicate?',
    options: [
      'Company has twice as many current assets as current liabilities',
      'Company has doubled its revenue',
      'Company debt is twice its equity',
      'Company profit margin is 200%',
    ],
    correct: 0,
  },
  {
    question: 'Which ratio measures how quickly a company collects receivables?',
    options: ['DIO', 'DSO', 'DPO', 'CCC'],
    correct: 1,
  },
  {
    question: 'A lower Cash Conversion Cycle (CCC) generally indicates:',
    options: [
      'Higher credit risk',
      'More efficient working capital management',
      'Lower profitability',
      'Higher debt levels',
    ],
    correct: 1,
  },
];

const Academy = () => {
  const [tab, setTab] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);

  const totalLessons = modules.reduce((s, m) => s + m.lessons, 0);
  const completedLessons = modules.reduce((s, m) => s + m.completed, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  const handleQuizSubmit = () => {
    const score = quizQuestions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    setQuizComplete(true);
    toast.success(`You scored ${score}/${quizQuestions.length}!`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Finance Academy</Typography>
          <Typography variant="body2" color="text.secondary">
            Learn credit analysis through interactive modules and quizzes
          </Typography>
        </Box>
        <Chip icon={<Star />} label={`${completedLessons * 10} XP`} color="secondary" sx={{ fontWeight: 600 }} />
      </Box>

      {/* Overall Progress */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)', color: 'white' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Your Learning Progress</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={overallProgress}
                  sx={{ flex: 1, height: 10, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#00bfa5' } }}
                />
                <Typography variant="h6" fontWeight={700}>{overallProgress}%</Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                {completedLessons} of {totalLessons} lessons completed
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button variant="contained" color="secondary" startIcon={<QuizIcon />} onClick={() => setQuizOpen(true)}>
                Take Quiz
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Modules" />
        <Tab label="Achievements" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          {modules.map((mod) => (
            <Grid item xs={12} sm={6} key={mod.id}>
              <Card sx={{ height: '100%', opacity: mod.status === 'locked' ? 0.6 : 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ bgcolor: mod.status === 'completed' ? 'success.main' : mod.status === 'in_progress' ? 'primary.main' : 'grey.400' }}>
                      {mod.status === 'completed' ? <CheckCircle /> : mod.status === 'locked' ? <Lock /> : <School />}
                    </Avatar>
                    <Chip
                      label={mod.status === 'completed' ? 'Completed' : mod.status === 'in_progress' ? 'In Progress' : 'Locked'}
                      size="small"
                      color={mod.status === 'completed' ? 'success' : mod.status === 'in_progress' ? 'primary' : 'default'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>{mod.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{mod.description}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(mod.completed / mod.lessons) * 100}
                      sx={{ flex: 1, height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption">{mod.completed}/{mod.lessons}</Typography>
                  </Box>
                  {mod.status !== 'locked' && (
                    <Button size="small" startIcon={<PlayCircle />} sx={{ mt: 1 }}>
                      {mod.status === 'completed' ? 'Review' : 'Continue'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2}>
          {achievements.map((a) => (
            <Grid item xs={12} sm={6} md={4} key={a.id}>
              <Card sx={{ opacity: a.earned ? 1 : 0.5 }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h3" sx={{ mb: 1 }}>{a.icon}</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>{a.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{a.description}</Typography>
                  {a.earned && <Chip label="Earned" size="small" color="success" sx={{ mt: 1 }} />}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Quiz Dialog */}
      <Dialog open={quizOpen} onClose={() => { setQuizOpen(false); setQuizComplete(false); setCurrentQ(0); setAnswers({}); }} maxWidth="sm" fullWidth>
        <DialogTitle>
          {quizComplete ? 'Quiz Results' : `Question ${currentQ + 1} of ${quizQuestions.length}`}
        </DialogTitle>
        <DialogContent>
          {!quizComplete ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {quizQuestions[currentQ].question}
              </Typography>
              <RadioGroup
                value={answers[currentQ] ?? ''}
                onChange={(e) => setAnswers({ ...answers, [currentQ]: parseInt(e.target.value) })}
              >
                {quizQuestions[currentQ].options.map((opt, i) => (
                  <FormControlLabel key={i} value={i} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <EmojiEvents sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" fontWeight={600}>
                {quizQuestions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0)}/{quizQuestions.length} Correct
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {quizQuestions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0) === quizQuestions.length
                  ? 'Perfect score! You earned the Ratio Master badge!'
                  : 'Keep learning and try again!'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {!quizComplete ? (
            <>
              {currentQ > 0 && <Button onClick={() => setCurrentQ((c) => c - 1)}>Previous</Button>}
              <Box sx={{ flex: 1 }} />
              {currentQ < quizQuestions.length - 1 ? (
                <Button variant="contained" onClick={() => setCurrentQ((c) => c + 1)} disabled={answers[currentQ] == null}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" onClick={handleQuizSubmit} disabled={answers[currentQ] == null}>
                  Submit
                </Button>
              )}
            </>
          ) : (
            <Button variant="contained" onClick={() => { setQuizOpen(false); setQuizComplete(false); setCurrentQ(0); setAnswers({}); }}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Academy;
