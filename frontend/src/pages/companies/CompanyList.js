import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Business as BusinessIcon,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, getRiskColor } from '../../utils/formatters';

const mockCompanies = [
  { id: 1, name: 'Tata Steel Ltd', industry: 'Steel & Manufacturing', revenue: 230000000000, risk: 'Low', status: 'Active', trend: 'up', reportCount: 5 },
  { id: 2, name: 'Reliance Industries', industry: 'Conglomerate', revenue: 890000000000, risk: 'Low', status: 'Active', trend: 'up', reportCount: 8 },
  { id: 3, name: 'Mahindra & Mahindra', industry: 'Automotive', revenue: 120000000000, risk: 'Medium', status: 'Active', trend: 'down', reportCount: 3 },
  { id: 4, name: 'Bajaj Auto', industry: 'Automotive', revenue: 43000000000, risk: 'High', status: 'Pending', trend: 'down', reportCount: 2 },
  { id: 5, name: 'Infosys Ltd', industry: 'IT Services', revenue: 164000000000, risk: 'Low', status: 'Active', trend: 'up', reportCount: 6 },
  { id: 6, name: 'Adani Enterprises', industry: 'Infrastructure', revenue: 83000000000, risk: 'Medium', status: 'Active', trend: 'up', reportCount: 4 },
];

const CompanyList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Companies</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and analyze your company portfolio
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/companies/new')}>
          Add Company
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search companies by name or industry..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filtered.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card
                sx={{ cursor: 'pointer', height: '100%' }}
                onClick={() => navigate(`/companies/${company.id}`)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
                      <BusinessIcon />
                    </Avatar>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAnchorEl(e.currentTarget);
                        setSelectedId(company.id);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {company.industry}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {formatCurrency(company.revenue)}
                    </Typography>
                    {company.trend === 'up' ? (
                      <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />
                    ) : (
                      <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={company.risk + ' Risk'}
                      size="small"
                      sx={{ bgcolor: getRiskColor(company.risk) + '18', color: getRiskColor(company.risk), fontWeight: 600 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {company.reportCount} reports
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { setAnchorEl(null); navigate(`/companies/${selectedId}`); }}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate(`/reports/generate?company=${selectedId}`); }}>
          Generate Report
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default CompanyList;
