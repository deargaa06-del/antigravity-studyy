import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TextArea } from '../components/Input';
import { getActivities, updateActivityStatus } from '../services/db';
import { generateAIText } from '../services/ai';

export function ReviewAndAI() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [focusType, setFocusType] = useState('학업 역량');

  useEffect(() => {
    const fetchActivity = async () => {
      const activities = await getActivities();
      const found = activities.find(a => a.id === id);
      if (found) {
        setActivity(found);
        if (found.aiText) setAiResult(found.aiText);
      } else {
        navigate('/teacher');
      }
    };
    fetchActivity();
  }, [id, navigate]);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const result = await generateAIText(activity, focusType);
    setAiResult(result);
    setIsGenerating(false);
  };

  const handleSendToStudent = async () => {
    await updateActivityStatus(id, '피드백완료', aiResult);
    alert('학생에게 피드백이 전송되었습니다.');
    navigate('/teacher');
  };

  // 바이트 수 계산 (한글 2바이트, 영문/숫자/공백 1바이트)
  const getByteLength = (str) => {
    let b, i, c;
    for (b = i = 0; c = str.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1);
    return b;
  };

  if (!activity) return null;

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <h1 style={{ color: 'var(--primary)', cursor: 'pointer', margin: 0 }} onClick={() => navigate('/teacher')}>
          생기부 마스터
        </h1>
        <span style={{ color: 'var(--text-muted)' }}>&gt; 생기부 검토 및 AI 추천</span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left: Original Student Text */}
        <Card style={{ backgroundColor: 'var(--bg-main)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>학생 원본 내용</h2>
          <p><strong>과목:</strong> {activity.subject}</p>
          <p><strong>강조 키워드:</strong> <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{activity.keyword}</span></p>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-muted)' }}>계기</h4>
              <p style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                {activity.motive}
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)' }}>과정</h4>
              <p style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                {activity.process}
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-muted)' }}>결과 및 변화</h4>
              <p style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                {activity.result}
              </p>
            </div>
          </div>
        </Card>

        {/* Right: AI Generation & Edit */}
        <Card style={{ border: '2px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>AI 대학 최적화 문구</h2>
            <select 
              value={focusType} 
              onChange={e => setFocusType(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--primary)', outline: 'none' }}
            >
              <option value="학업 역량">학업 역량 집중</option>
              <option value="진로 역량">진로 역량 집중</option>
              <option value="공동체 역량">공동체 역량 집중</option>
            </select>
          </div>
          
          <Button 
            style={{ width: '100%', marginBottom: '1rem' }} 
            onClick={handleGenerateAI}
            disabled={isGenerating}
          >
            {isGenerating ? 'AI 문구 생성 중...' : '✨ AI 추천 문구 생성'}
          </Button>

          <TextArea 
            value={aiResult}
            onChange={(e) => setAiResult(e.target.value)}
            style={{ minHeight: '300px', backgroundColor: '#fdfcbc', borderColor: '#fde047' }}
            placeholder="AI 생성 버튼을 누르거나 직접 문구를 작성/수정할 수 있습니다."
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              글자 수: <strong style={{ color: getByteLength(aiResult) > 1500 ? 'red' : 'inherit' }}>{getByteLength(aiResult)}</strong> Bytes (권장 1500바이트 이하)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <Button variant="outline" onClick={() => alert('반려 사유 입력 후 학생에게 재요청합니다.')}>반려 및 재요청</Button>
            <Button onClick={handleSendToStudent} disabled={!aiResult}>학생에게 전달</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
