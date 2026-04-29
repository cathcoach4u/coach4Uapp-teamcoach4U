// AI functions for businesscoach4u
// Calls Supabase Edge Function which handles Anthropic API integration

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaXhldGZ2Ym9ldmp4bGtmeXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDY2ODAsImV4cCI6MjA5MDQyMjY4MH0.ZXYJVdvcj70aGMH1FAixIr0hNCaCDSYLEL93hHVCGDU'
const EDGE_FUNCTION_URL = 'https://uoixetfvboevjxlkfyqy.supabase.co/functions/v1/ai-proxy'

const HUB_PROMPTS = {
  strategic: `You are a warm, practical business strategy coach helping leaders get clear on direction, values and vision. Help them think through their business strategy, clarify what matters most, and set a compelling direction. Be encouraging and grounded in practical business thinking.`,
  operations: `You are a weekly execution coach helping leaders stay on track with priorities, issues and metrics. Help them review progress, identify blockers, and stay focused on what matters most. Be practical, supportive, and focused on moving things forward.`,
  leadership: `You are a leadership development coach helping leaders develop their people through a strengths lens. Help them understand how to bring out the best in their team members. Be warm, encouraging, and focused on unlocking potential.`,
  people: `You are a team development coach helping managers understand their team's strengths and role fit.`,
}

function getDemoAIResponse(message, hub, onChunk) {
  const response = `Thanks for sharing that! Here are some thoughts for your business strategy:\n\n**Key Considerations:**\n- Start by understanding your core values and what truly matters to your business\n- Think about your 10-year vision and work backwards to set 1-year targets\n- Make sure your strategy aligns with your market opportunity\n\n**Next Steps:**\n1. Define your core purpose and what makes you unique\n2. Set clear 3-5 year goals\n3. Break these into quarterly priorities (rocks)\n4. Track progress with key metrics`;
  if (onChunk) {
    const words = response.split(' ');
    for (let i = 0; i < words.length; i++) {
      onChunk(words[i] + (i < words.length - 1 ? ' ' : ''));
    }
  }
  return response;
}

window.askAI = async function(message, hub, module, context, onChunk) {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ message, hub, module, context, stream: true })
    });

    if (!response.ok) {
      if (response.status === 500 || response.status === 404) {
        return getDemoAIResponse(message, hub, onChunk);
      }
      throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const json = JSON.parse(data);
          if (json.type === 'content_block_delta' && json.delta.type === 'text_delta') {
            const text = json.delta.text;
            fullResponse += text;
            if (onChunk) onChunk(text);
          }
        } catch (e) {}
      }
    }
    return fullResponse;
  } catch (err) {
    console.error('AI API error:', err);
    throw err;
  }
}

window.askAISimple = async function(message, hub, module, context) {
  const response = await fetch(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ message, hub, module, context, stream: false })
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const json = await response.json();
  if (json.content?.[0]?.text) return json.content[0].text;
  if (json.text) return json.text;
  throw new Error('No response text from API');
}
