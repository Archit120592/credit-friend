import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../../components/common/StatCard';

const mockUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@credit.co', role: 'admin', status: 'Active', reports: 45 },
  { id: 2, name: 'Priya Patel', email: 'priya@credit.co', role: 'sales', status: 'Active', reports: 32 },
  { id: 3, name: 'Amit Singh', email: 'amit@credit.co', role: 'sales', status: 'Active', reports: 28 },
  { id: 4, name: 'Neha Gupta', email: 'neha@credit.co', role: 'sales', status: 'Inactive', reports: 15 },
];

const usageData = [
  { date: 'Mon', reports: 8, logins: 12 },
  { date: 'Tue', reports: 12, logins: 15 },
  { date: 'Wed', reports: 6, logins: 10 },
  { date: 'Thu', reports: 15, logins: 18 },
  { date: 'Fri', reports: 10, logins: 14 },
  { date: 'Sat', reports: 3, logins: 5 },
  { date: 'Sun', reports: 2, logins: 3 },
];

const AdminPanel = () => {
  const [tab, setTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Admin Panel</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage users, monitor activity, and configure system settings
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value="24" subtitle="4 admins, 20 sales" icon={<PeopleIcon fontSize="large" />} color="primary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Reports This Week" value="56" trend={15} subtitle="vs last week" icon={<AssessmentIcon fontSize="large" />} color="secondary.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Sessions" value="8" subtitle="currently online" icon={<TrendingUp fontSize="large" />} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="API Calls Today" value="342" trend={-5} subtitle="vs yesterday" icon={<SettingsIcon fontSize="large" />} color="warning.main" />
        </Grid>
      </Grid>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="User Management" />
        <Tab label="System Analytics" />
        <Tab label="Credit Logic" />
      </Tabs>

      {tab === 0 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>Users</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
                Add User
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>User</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Role</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Reports</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', fontSize: 14 }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          {user.name}
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip label={user.role} size="small" color={user.role === 'admin' ? 'primary' : 'default'} variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip label={user.status} size="small" color={user.status === 'Active' ? 'success' : 'default'} />
                      </TableCell>
                      <TableCell>{user.reports}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>Weekly Activity</Typography>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reports" stroke="#1a237e" strokeWidth={2} dot={{ r: 4 }} name="Reports" />
                <Line type="monotone" dataKey="logins" stroke="#00bfa5" strokeWidth={2} dot={{ r: 4 }} name="Logins" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>Credit Logic Configuration</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Configure risk buckets, scoring weights, and decision criteria
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Risk Buckets</Typography>
                    {['Low (Score 70-100)', 'Medium (Score 50-69)', 'High (Score 30-49)', 'Critical (Score 0-29)'].map((bucket) => (
                      <Chip key={bucket} label={bucket} sx={{ mr: 1, mb: 1 }} variant="outlined" />
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Scoring Weights</Typography>
                    {[
                      { name: 'Financial Ratios', weight: '40%' },
                      { name: 'Market Position', weight: '20%' },
                      { name: 'Management Quality', weight: '15%' },
                      { name: 'Industry Outlook', weight: '15%' },
                      { name: 'Collateral', weight: '10%' },
                    ].map((w) => (
                      <Box key={w.name} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                        <Typography variant="body2">{w.name}</Typography>
                        <Typography variant="body2" fontWeight={600}>{w.weight}</Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Add User Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Full Name" margin="normal" />
          <TextField fullWidth label="Email Address" type="email" margin="normal" />
          <TextField fullWidth select label="Role" margin="normal" defaultValue="sales">
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>Add User</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default AdminPanel;
