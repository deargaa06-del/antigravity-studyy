import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { loginUser } from '../services/db';

export function Login() {
  const [role, setRole] = useState('학생');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginUser(email, password, role);
    if (user) {
      if (role === '교사') navigate('/teacher');
      else navigate('/student');
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: '400px', maxWidth: '100%' }} className="animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>생기부 마스터</h1>
          <p style={{ color: 'var(--text-muted)' }}>대학 입시 최적화 생기부 보조 플랫폼</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Button 
            variant={role === '학생' ? 'primary' : 'secondary'} 
            style={{ flex: 1 }}
            onClick={() => setRole('학생')}
          >
            학생용
          </Button>
          <Button 
            variant={role === '교사' ? 'primary' : 'secondary'} 
            style={{ flex: 1 }}
            onClick={() => setRole('교사')}
          >
            교사용
          </Button>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            label="이메일" 
            type="email" 
            placeholder="이메일을 입력하세요" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input 
            label="비밀번호" 
            type="password" 
            placeholder="비밀번호를 입력하세요" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" style={{ marginTop: '1rem' }}>
            {role} 로그인
          </Button>
        </form>
      </Card>
    </div>
  );
}
