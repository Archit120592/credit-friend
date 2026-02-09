import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowBack, Download, CheckCircle } from '@mui/icons-material';
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

const reportData = {
  company: 'Tata Steel Ltd',
  type: 'Full Analysis',
  status: 'Approved',
  risk: 'Low',
  score: 82,
  createdAt: '2026-02-08',
  analyst: 'Rahul Sharma',
  sections: [
    {
      title: 'Executive Summary',
      content: 'Tata Steel Ltd demonstrates strong financial health with robust liquidity ratios and manageable debt levels. The company maintains a solid market position in the steel manufacturing sector with consistent revenue growth over the past three fiscal years.',
    },
    {
      title: 'Financial Analysis',
      content: 'Current Ratio of 1.45x indicates adequate short-term liquidity. Debt-to-Equity ratio of 0.72x is well within acceptable limits for the manufacturing sector. Interest Coverage Ratio of 5.8x shows comfortable ability to service debt obligations.',
    },
    {
      title: 'Risk Assessment',
      content: 'Overall credit risk is categorized as LOW. Key strengths include diversified revenue streams, strong brand equity, and conservative financial management. Primary risks include commodity price volatility and cyclical industry dynamics.',
    },
    {
      title: 'Recommendation',
      content: 'Based on comprehensive analysis, the credit committee recommends APPROVAL for the requested supply chain finance facility. Suggested credit limit: INR 50 Cr with standard covenants for the manufacturing sector.',
    },
  ],
};

const radarData = [
  { metric: 'Liquidity', score: 78 },
  { metric: 'Solvency', score: 82 },
  { metric: 'Efficiency', score: 70 },
  { metric: 'Profitability', score: 75 },
  { metric: 'Coverage', score: 85 },
  { metric: 'Market', score: 68 },
];

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/reports')} sx={{ mb: 2 }}>
        Back to Reports
      </Button>

      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={700}>{reportData.company}</Typography>
              <Typography variant="body2" color="text.secondary">
                {reportData.type} &bull; Generated on {reportData.createdAt} &bull; Analyst: {reportData.analyst}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip label={`Score: ${reportData.score}`} color="success" />
              <Chip label={reportData.risk + ' Risk'} variant="outlined" color="success" />
              <Chip label={reportData.status} icon={<CheckCircle />} color="success" />
              <Button variant="outlined" startIcon={<Download />}>Export PDF</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Radar Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Score Breakdown</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Score" dataKey="score" stroke="#1a237e" fill="#1a237e" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
              <Divider sx={{ my: 2 }} />
              <List dense disablePadding>
                {radarData.map((item) => (
                  <ListItem key={item.metric} sx={{ px: 0 }}>
                    <ListItemText primary={item.metric} />
                    <Typography variant="body2" fontWeight={600}>{item.score}/100</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Report Sections */}
        <Grid item xs={12} md={8}>
          {reportData.sections.map((section, i) => (
            <Card key={i} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>{section.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ReportDetail;
