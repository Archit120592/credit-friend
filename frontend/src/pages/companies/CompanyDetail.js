import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Assessment,
  Upload,
  Business,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';

const companyData = {
  name: 'Tata Steel Ltd',
  industry: 'Steel & Manufacturing',
  cin: 'L27100MH1907PLC000260',
  revenue: 230000000000,
  risk: 'Low',
  status: 'Active',
  financials: {
    currentRatio: 1.45,
    quickRatio: 0.98,
    debtEquity: 0.72,
    interestCoverage: 5.8,
    dio: 48,
    dso: 32,
    dpo: 55,
    ccc: 25,
    tolTnw: 1.15,
  },
};

const radarData = [
  { metric: 'Liquidity', score: 78 },
  { metric: 'Solvency', score: 82 },
  { metric: 'Efficiency', score: 70 },
  { metric: 'Profitability', score: 75 },
  { metric: 'Coverage', score: 85 },
  { metric: 'Market', score: 68 },
];

const ratioRows = [
  { name: 'Current Ratio', value: companyData.financials.currentRatio, benchmark: 1.5, unit: 'x' },
  { name: 'Quick Ratio', value: companyData.financials.quickRatio, benchmark: 1.0, unit: 'x' },
  { name: 'Debt/Equity', value: companyData.financials.debtEquity, benchmark: 1.0, unit: 'x' },
  { name: 'Interest Coverage', value: companyData.financials.interestCoverage, benchmark: 3.0, unit: 'x' },
  { name: 'DIO (Days)', value: companyData.financials.dio, benchmark: 45, unit: 'days' },
  { name: 'DSO (Days)', value: companyData.financials.dso, benchmark: 30, unit: 'days' },
  { name: 'DPO (Days)', value: companyData.financials.dpo, benchmark: 50, unit: 'days' },
  { name: 'Cash Conversion Cycle', value: companyData.financials.ccc, benchmark: 30, unit: 'days' },
  { name: 'TOL/TNW', value: companyData.financials.tolTnw, benchmark: 2.0, unit: 'x' },
];

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/companies')} sx={{ mb: 2 }}>
        Back to Companies
      </Button>

      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <Business fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700}>{companyData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {companyData.industry} &bull; CIN: {companyData.cin}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip label="Low Risk" color="success" />
              <Button variant="contained" startIcon={<Assessment />} onClick={() => navigate(`/reports/generate?company=${id}`)}>
                Generate Report
              </Button>
              <Button variant="outlined" startIcon={<Upload />}>
                Upload Docs
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Financial Ratios" />
        <Tab label="Risk Assessment" />
        <Tab label="Reports" />
        <Tab label="Documents" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          {/* Key Metrics */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Risk Profile</Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#1a237e" fill="#1a237e" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Ratio Table */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Financial Ratios</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Metric</strong></TableCell>
                        <TableCell align="right"><strong>Value</strong></TableCell>
                        <TableCell align="right"><strong>Benchmark</strong></TableCell>
                        <TableCell align="right"><strong>Status</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ratioRows.map((row) => {
                        const isGood = row.name.includes('Debt') || row.name.includes('DIO') || row.name.includes('DSO') || row.name.includes('CCC') || row.name.includes('TOL')
                          ? row.value <= row.benchmark
                          : row.value >= row.benchmark;
                        return (
                          <TableRow key={row.name} hover>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>
                              {formatNumber(row.value)} {row.unit}
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'text.secondary' }}>
                              {formatNumber(row.benchmark)} {row.unit}
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={isGood ? 'Good' : 'Below'}
                                size="small"
                                color={isGood ? 'success' : 'warning'}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Summary */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Revenue</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={3}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Annual Revenue</Typography>
                    <Typography variant="h6" fontWeight={600}>{formatCurrency(companyData.revenue)}</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Cash Conversion Cycle</Typography>
                    <Typography variant="h6" fontWeight={600}>{companyData.financials.ccc} days</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Debt/Equity</Typography>
                    <Typography variant="h6" fontWeight={600}>{formatNumber(companyData.financials.debtEquity)}x</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Interest Coverage</Typography>
                    <Typography variant="h6" fontWeight={600}>{formatNumber(companyData.financials.interestCoverage)}x</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Card><CardContent><Typography color="text.secondary">Risk assessment details will appear here once backend is connected.</Typography></CardContent></Card>
      )}
      {tab === 2 && (
        <Card><CardContent><Typography color="text.secondary">Report history will appear here once backend is connected.</Typography></CardContent></Card>
      )}
      {tab === 3 && (
        <Card><CardContent><Typography color="text.secondary">Uploaded documents will appear here once backend is connected.</Typography></CardContent></Card>
      )}
    </motion.div>
  );
};

export default CompanyDetail;
