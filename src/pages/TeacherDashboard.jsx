import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getActivities, getCurrentUser, logoutUser } from '../services/db';

export function TeacherDashboard() {
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== '교사') {
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
        <h1 style={{ color: 'var(--primary)' }}>생기부 마스터 - 교사용 대시보드</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>{user?.email} 선생님</span>
          <Button variant="outline" onClick={handleLogout}>로그아웃</Button>
        </div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>학생 제출 현황</h2>
        <Button variant="secondary" onClick={() => alert('학생 CSV 파일 불러오기 기능은 추후 연동됩니다.')}>
          CSV로 학생 목록 추가
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {activities.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            접수된 학생 활동 내역이 없습니다.
          </Card>
        ) : (
          activities.map(activity => (
            <Card key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>홍길동 (임시 학생)</span>
                  <span style={{ 
                    fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '1rem',
                    backgroundColor: activity.status === '대기중' ? '#fef3c7' : 
                                     activity.status === '수정요청' ? '#fee2e2' : '#d1fae5',
                    color: activity.status === '대기중' ? '#d97706' : 
                           activity.status === '수정요청' ? '#ef4444' : '#059669'
                  }}>
                    {activity.status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>과목: {activity.subject} | 키워드: {activity.keyword}</p>
              </div>
              
              <Button onClick={() => navigate(`/teacher/review/${activity.id}`)}>
                {activity.status === '대기중' ? '검토 및 AI 변환' : '피드백 확인'}
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
