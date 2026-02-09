import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Save,
  Assessment,
  School,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Rahul Sharma',
    email: user?.email || 'rahul@credit.co',
    phone: '+91 98765 43210',
    department: 'Sales Team',
  });

  const handleSave = () => {
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const stats = [
    { label: 'Reports Generated', value: 45, icon: <Assessment /> },
    { label: 'Academy Progress', value: '68%', icon: <School /> },
    { label: 'Achievements', value: '3/6', icon: <EmojiEvents /> },
  ];

  const recentActivity = [
    { action: 'Generated report for Tata Steel Ltd', time: '2 hours ago' },
    { action: 'Completed lesson: Financial Ratio Analysis', time: '5 hours ago' },
    { action: 'Added company: Infosys Ltd', time: '1 day ago' },
    { action: 'Earned badge: Ratio Master', time: '2 days ago' },
    { action: 'Generated report for Reliance Industries', time: '3 days ago' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Profile</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your account and view your activity
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 32 }}>
                {form.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" fontWeight={600}>{form.name}</Typography>
              <Typography variant="body2" color="text.secondary">{form.email}</Typography>
              <Chip label={user?.role === 'admin' ? 'Administrator' : 'Sales Team'} sx={{ mt: 1 }} color="primary" variant="outlined" />

              <Divider sx={{ my: 3 }} />

              {stats.map((stat) => (
                <Box key={stat.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {stat.icon}
                    <Typography variant="body2">{stat.label}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={600}>{stat.value}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" gutterBottom>Academy Progress</Typography>
              <LinearProgress variant="determinate" value={68} sx={{ height: 8, borderRadius: 4, mb: 1 }} />
              <Typography variant="caption" color="text.secondary">22 of 32 lessons completed</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile & Activity */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Personal Information</Typography>
                <Button
                  variant={editing ? 'contained' : 'outlined'}
                  startIcon={editing ? <Save /> : <Person />}
                  onClick={editing ? handleSave : () => setEditing(true)}
                >
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={form.department}
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Recent Activity</Typography>
              <List disablePadding>
                {recentActivity.map((activity, i) => (
                  <ListItem key={i} sx={{ px: 0 }} divider={i < recentActivity.length - 1}>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
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

export default Profile;
