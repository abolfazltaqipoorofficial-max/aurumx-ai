require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const demoNews = [
 {title:'US inflation data approaches',source:'Macro Desk',impact:'HIGH',time:'Live'},
 {title:'Dollar index volatility increases',source:'Market Radar',impact:'HIGH',time:'Live'},
 {title:'Central-bank policy expectations shift',source:'Global Markets',impact:'MEDIUM',time:'Live'},
 {title:'Gold demand remains in focus',source:'Commodities Desk',impact:'MEDIUM',time:'Live'},
 {title:'Risk sentiment changes across markets',source:'Global Risk',impact:'MEDIUM',time:'Live'},
 {title:'Treasury yields move in early trade',source:'Rates Desk',impact:'HIGH',time:'Live'}
];

app.get('/api/health', (_,res)=>res.json({ok:true,service:'AURUMX AI'}));

app.get('/api/market/xauusd', (_,res)=>res.json({
 symbol:'XAUUSD', price: null, bid:null, ask:null, change:null,
 status:'provider-required', updatedAt:new Date().toISOString()
}));

app.get('/api/news', (_,res)=>res.json({
 items: demoNews,
 status: process.env.NEWS_API_KEY ? 'configured' : 'demo'
}));

app.get('/api/calendar', (_,res)=>res.json({
 items:[
  {event:'US CPI',impact:'HIGH',actual:'—',forecast:'—',previous:'—'},
  {event:'FOMC Rate Decision',impact:'HIGH',actual:'—',forecast:'—',previous:'—'},
  {event:'US NFP',impact:'HIGH',actual:'—',forecast:'—',previous:'—'},
  {event:'PCE Price Index',impact:'HIGH',actual:'—',forecast:'—',previous:'—'}
 ],
 status:process.env.CALENDAR_API_KEY ? 'configured':'demo'
}));

app.post('/api/ai/analyze', async (req,res)=>{
 const {symbol='XAUUSD', timeframe='1H', context=''} = req.body || {};
 // Connect your licensed AI provider here. Keep the key server-side.
 res.json({
  symbol,timeframe,
  bias:'NEUTRAL',
  confidence:null,
  entryZone:'—',
  stopLoss:'—',
  takeProfit1:'—',
  takeProfit2:'—',
  invalidation:'—',
  reasons:[
   'Connect live market data and news providers.',
   'The AI layer will combine price action, macro events and news sentiment.',
   context ? `User context received: ${context.slice(0,120)}` : 'No extra context supplied.'
  ],
  disclaimer:'Scenario analysis only; not a guaranteed prediction or automatic trade execution.'
 });
});

app.post('/api/ai/chat', async (req,res)=>{
 const message=String(req.body?.message||'').slice(0,2000);
 res.json({
  reply:`AURUMX AI received: "${message}". Connect OPENAI_API_KEY and live market/news feeds on the server to enable real-time analysis.`,
  mode:'provider-required'
 });
});

app.listen(process.env.PORT || 3000, ()=>console.log(`AURUMX AI running on http://localhost:${process.env.PORT||3000}`));
