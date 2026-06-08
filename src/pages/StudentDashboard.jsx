import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getActivities, getCurrentUser, logoutUser } from '../services/db';

export function StudentDashboard() {
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      fetchActivities();
    }
  }, [navigate]);

  const fetchActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => navigate('/student')}>
          생기부 마스터
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>{user?.email} (학생)</span>
          <Button variant="outline" onClick={handleLogout}>로그아웃</Button>
        </div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>내 활동 목록</h2>
        <Button onClick={() => navigate('/student/new')}>+ 새 활동 작성</Button>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {activities.length === 0 ? (
          <Card style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            아직 작성된 활동이 없습니다. 새 활동을 작성해보세요!
          </Card>
        ) : (
          activities.map(activity => (
            <Card key={activity.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{activity.subject}</span>
                <span style={{ 
                  fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '1rem',
                  backgroundColor: activity.status === '대기중' ? '#fef3c7' : '#d1fae5',
                  color: activity.status === '대기중' ? '#d97706' : '#059669'
                }}>
                  {activity.status}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>키워드: {activity.keyword}</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activity.motive}
              </p>
              {activity.aiText && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius)' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>교사 피드백 완료</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{activity.aiText.substring(0, 50)}...</p>
                  <Button variant="outline" style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.8rem' }} onClick={() => navigate(`/student/view/${activity.id}`)}>
                    피드백 확인 및 확정
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
