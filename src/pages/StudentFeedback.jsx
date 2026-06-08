import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getActivities, updateActivityStatus } from '../services/db';

export function StudentFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      const activities = await getActivities();
      const found = activities.find(a => a.id === id);
      if (found) setActivity(found);
      else navigate('/student');
    };
    fetchActivity();
  }, [id, navigate]);

  const handleConfirm = async () => {
    await updateActivityStatus(id, '확정됨', activity.aiText);
    alert('최종 확정되었습니다.');
    navigate('/student');
  };

  const handleRequestEdit = async () => {
    await updateActivityStatus(id, '수정요청', activity.aiText);
    alert('교사에게 수정을 요청했습니다.');
    navigate('/student');
  };

  if (!activity) return null;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <h1 style={{ color: 'var(--primary)', cursor: 'pointer', margin: 0 }} onClick={() => navigate('/student')}>
          생기부 마스터
        </h1>
        <span style={{ color: 'var(--text-muted)' }}>&gt; 피드백 확인</span>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Card>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>내가 제출한 내용</h3>
          <p><strong>과목:</strong> {activity.subject}</p>
          <p><strong>키워드:</strong> {activity.keyword}</p>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius)' }}>
            <p><strong>계기:</strong><br/>{activity.motive}</p>
            <p style={{ marginTop: '0.5rem' }}><strong>과정:</strong><br/>{activity.process}</p>
            <p style={{ marginTop: '0.5rem' }}><strong>결과:</strong><br/>{activity.result}</p>
          </div>
        </Card>

        <Card style={{ border: '2px solid var(--success)' }}>
          <h3 style={{ color: 'var(--success)', marginBottom: '1rem' }}>교사 및 AI 추천 문구</h3>
          <div style={{ padding: '1rem', backgroundColor: '#ecfdf5', borderRadius: 'var(--radius)', lineHeight: '1.6' }}>
            {activity.aiText}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <Button variant="outline" onClick={handleRequestEdit}>수정 요청</Button>
            <Button style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)' }} onClick={handleConfirm}>
              이 내용으로 확정
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
