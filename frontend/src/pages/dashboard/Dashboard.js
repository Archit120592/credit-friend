import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';

const monthlyData = [
  { month: 'Aug', reports: 12 },
  { month: 'Sep', reports: 19 },
  { month: 'Oct', reports: 15 },
  { month: 'Nov', reports: 25 },
  { month: 'Dec', reports: 22 },
  { month: 'Jan', reports: 30 },
];

const riskDistribution = [
  { name: 'Low Risk', value: 45, color: '#2e7d32' },
  { name: 'Medium Risk', value: 30, color: '#ff9800' },
  { name: 'High Risk', value: 18, color: '#d32f2f' },
  { name: 'Critical', value: 7, color: '#b71c1c' },
];

const recentReports = [
  { id: 1, company: 'Tata Steel Ltd', status: 'approved', risk: 'Low', date: '2 hours ago' },
  { id: 2, company: 'Reliance Industries', status: 'review', risk: 'Medium', date: '5 hours ago' },
  { id: 3, company: 'Mahindra Finance', status: 'draft', risk: 'Low', date: '1 day ago' },
  { id: 4, company: 'Bajaj Auto', status: 'approved', risk: 'High', date: '2 days ago' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your credit analysis activity
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Companies"
            value="156"
            subtitle="vs last month"
            trend={12}
            icon={<BusinessIcon fontSize="large" />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Reports Generated"
            value="89"
            subtitle="vs last month"
            trend={8}
            icon={<AssessmentIcon fontSize="large" />}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Approval Rate"
            value="73%"
            subtitle="vs last month"
            trend={5}
            icon={<TrendingUpIcon fontSize="large" />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Review"
            value="12"
            subtitle="need attention"
            icon={<WarningIcon fontSize="large" />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Reports Over Time</Typography>
                <Chip label="Last 6 months" size="small" variant="outlined" />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reports" fill="#1a237e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Risk Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions & Recent Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => navigate('/companies/new')}
                >
                  Add New Company
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AssessmentIcon />}
                  fullWidth
                  onClick={() => navigate('/reports/generate')}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowForwardIcon />}
                  fullWidth
                  onClick={() => navigate('/academy')}
                >
                  Finance Academy
                </Button>
              </Box>

              {/* Progress Indicator */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Monthly Target Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={73}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" fontWeight={600}>73%</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  22 of 30 reports completed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={600}>Recent Reports</Typography>
                <Button size="small" onClick={() => navigate('/reports')}>View All</Button>
              </Box>
              <List disablePadding>
                {recentReports.map((report) => (
                  <ListItem
                    key={report.id}
                    sx={{ px: 0, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, borderRadius: 1 }}
                    onClick={() => navigate(`/reports/${report.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <BusinessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={report.company}
                      secondary={report.date}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip
                        label={report.risk}
                        size="small"
                        sx={{
                          bgcolor: report.risk === 'Low' ? '#e8f5e9' : report.risk === 'Medium' ? '#fff3e0' : '#ffebee',
                          color: report.risk === 'Low' ? '#2e7d32' : report.risk === 'Medium' ? '#e65100' : '#c62828',
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label={report.status}
                        size="small"
                        color={report.status === 'approved' ? 'success' : report.status === 'review' ? 'info' : 'default'}
                        variant="outlined"
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Dashboard;
