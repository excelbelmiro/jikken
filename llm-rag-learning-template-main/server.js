// Tavily Search API
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

app.post('/api/web-search', limiter, async (req, res) => {
    try {
        const { student_id, query, max_results = 5 } = req.body;
        
        if (!student_id || !query) {
            return res.status(400).json({ 
                error: 'student_id と query は必須です' 
            });
        }
        
        // 使用量チェック
        const { allowed, usage } = checkStudentUsage(student_id);
        if (!allowed) {
            return res.status(429).json({ error: '本日の使用制限に達しました' });
        }
        
        // Tavily API 呼び出し
        const searchResponse = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: query,
                search_depth: 'basic',
                max_results: max_results,
                include_answer: false,
                include_raw_content: false
            })
        });
        
        const searchData = await searchResponse.json();
        
        // 使用量更新
        usage.requests++;
        usageTracker.set(student_id, usage);
        
        // 結果を整形
        const results = searchData.results?.map(item => ({
            title: item.title,
            url: item.url,
            snippet: item.content,
            publishedDate: item.published_date || null
        })) || [];
        
        console.log(`[${new Date().toISOString()}] ${student_id}: Web検索 "${query}"`);
        
        res.json({
            query: query,
            results: results,
            retrievedAt: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Web Search Error:', error);
        res.status(500).json({ 
            error: 'Web検索エラーが発生しました',
            message: error.message 
        });
    }
});
