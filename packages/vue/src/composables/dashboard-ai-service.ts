import OpenAI from 'openai';
import {
  Sale, SaleOrOpportunityByCategory, SaleByState,
} from '@/types/analytics';

export interface DashboardContext {
  periodName: string;
  dateRange: string[];
  salesTotal: number;
  opportunitiesTotal: number;
  sales: Sale[];
  opportunities: SaleOrOpportunityByCategory[];
  salesByCategory: SaleOrOpportunityByCategory[];
  salesByState: SaleByState[];
  conversionRate: number;
  leads: number;
}

export const AzureOpenAIConfig = {
  dangerouslyAllowBrowser: true,
  deployment: 'demo',
  apiVersion: '2024-02-01',
  endpoint: 'https://public-api.devexpress.com/demo-openai',
  apiKey: 'DEMO',
};

export const ALERT_TIMEOUT = 1000 * 60;

export type ConversationMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const chatService = new OpenAI({
  baseURL: `${AzureOpenAIConfig.endpoint}/openai/deployments/${AzureOpenAIConfig.deployment}`,
  apiKey: AzureOpenAIConfig.apiKey,
  defaultQuery: { 'api-version': AzureOpenAIConfig.apiVersion },
  dangerouslyAllowBrowser: AzureOpenAIConfig.dangerouslyAllowBrowser,
});

function formatCurrency(value: number): string {
  return `$${(value ?? 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function buildSystemPrompt(ctx: DashboardContext): string {
  const statesSummary = [...ctx.salesByState]
    .sort((a, b) => b.total - a.total)
    .map((s) => `${s.stateName}: ${formatCurrency(s.total)} (${(s.percentage ?? 0).toFixed(1)}%)`)
    .join('; ');

  const categoriesSummary = [...ctx.salesByCategory]
    .sort((a, b) => b.value - a.value)
    .map((c) => `${c.name}: ${formatCurrency(c.value)}`)
    .join('; ');

  const opportunitiesSummary = [...ctx.opportunities]
    .sort((a, b) => b.value - a.value)
    .map((o) => `${o.name}: ${formatCurrency(o.value)}`)
    .join('; ');

  return [
    'You are an AI analytics assistant embedded in a sales dashboard application.',
    'Analyze the data provided and give concise, actionable insights.',
    'Use markdown formatting in responses. Be specific with numbers from the data.',
    'If you do not have certain information or cannot find specific data, say so honestly. Do not invent, fabricate, or guess data. Use only the data provided above.',
    '',
    'CURRENT DASHBOARD STATE:',
    `- Selected period: "${ctx.periodName}" (${ctx.dateRange[0]} to ${ctx.dateRange[1]})`,
    `- Total revenue: ${formatCurrency(ctx.salesTotal)}`,
    `- Total opportunities value: ${formatCurrency(ctx.opportunitiesTotal)}`,
    `- Conversion rate: ${ctx.conversionRate}%`,
    `- Active leads: ${ctx.leads}`,
    '',
    `REVENUE BY STATE: ${statesSummary}`,
    '',
    `SALES BY CATEGORY: ${categoriesSummary}`,
    '',
    `OPPORTUNITIES BY CATEGORY: ${opportunitiesSummary}`,
    '',
    `SALES DATA POINTS (${ctx.sales.length} records):`,
    ...ctx.sales.slice(0, 20).map((s) => `  ${s.date}: ${formatCurrency(s.total)}${s.category ? ` [${s.category}]` : ''}`),
    ctx.sales.length > 20 ? `  ... and ${ctx.sales.length - 20} more records` : '',
    '',
    'Available period tabs: Week, 2 Weeks, Month, Year, All.',
    'The user can switch between these periods to see different date ranges.',
    'Always reference the current period in your responses so the user knows what data you are analyzing.',
  ].join('\n');
}

export async function getAIResponse(
  conversationHistory: ConversationMessage[],
  context: DashboardContext,
): Promise<string> {
  const systemMessage: ConversationMessage = {
    role: 'system',
    content: buildSystemPrompt(context),
  };

  const messages = [systemMessage, ...conversationHistory];

  const response = await chatService.chat.completions.create({
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    model: AzureOpenAIConfig.deployment,
  });

  return response.choices[0]?.message?.content ?? '';
}
