import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Input, TextArea } from '../components/Input';
import { Button } from '../components/Button';
import { saveActivity } from '../services/db';

export function ActivityInput() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    linkedSubject: '',
    keyword: '성실함',
    customKeyword: '',
    motive: '',
    process: '',
    result: ''
  });

  const keywords = ['성실함', '열정적임', '리더십 있음', '창의적임', '책임감', '신뢰가능함', '재능있음', '기타'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalKeyword = formData.keyword === '기타' ? formData.customKeyword : formData.keyword;
    await saveActivity({ ...formData, keyword: finalKeyword });
    alert("제출이 완료되었습니다. 교사에게 알림이 전송됩니다.");
    navigate('/student');
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <h1 style={{ color: 'var(--primary)', cursor: 'pointer', margin: 0 }} onClick={() => navigate('/student')}>
          생기부 마스터
        </h1>
        <span style={{ color: 'var(--text-muted)' }}>&gt; 활동 소재 입력</span>
      </header>

      <Card>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input 
              label="과목명" 
              id="subject" 
              placeholder="예: 국어, 수학, 진로활동 등" 
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <Input 
              label="연계 과목 (선택사항)" 
              id="linkedSubject" 
              placeholder="예: 세계사, 사회문화 등" 
              value={formData.linkedSubject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>강조 키워드 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {keywords.map(kw => (
                <button
                  key={kw}
                  type="button"
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer',
                    border: formData.keyword === kw ? '2px solid var(--primary)' : '1px solid var(--border)',
                    backgroundColor: formData.keyword === kw ? '#eff6ff' : 'var(--bg-card)',
                    color: formData.keyword === kw ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: formData.keyword === kw ? 600 : 400
                  }}
                  onClick={() => setFormData(prev => ({ ...prev, keyword: kw }))}
                >
                  {kw}
                </button>
              ))}
            </div>
            {formData.keyword === '기타' && (
              <Input 
                id="customKeyword" 
                placeholder="원하는 키워드를 직접 입력하세요" 
                value={formData.customKeyword}
                onChange={handleChange}
                style={{ marginTop: '0.5rem' }}
                required
              />
            )}
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#eff6ff', borderRadius: 'var(--radius)', border: '1px solid #bfdbfe' }}>
            <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem', fontSize: '1rem' }}>구조화된 입력</h3>
            <p style={{ fontSize: '0.85rem', color: '#3b82f6', marginBottom: '1rem' }}>
              결과 중심이 아닌 동기와 과정이 잘 드러나도록 구체적으로 작성해주세요.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextArea 
                label="계기 (이 활동을 왜 시작했나요?)" 
                id="motive" 
                placeholder="수업 중 생긴 호기심, 책을 읽고 든 의문 등"
                value={formData.motive}
                onChange={handleChange}
                required
              />
              <TextArea 
                label="과정 (문제를 해결하기 위해 어떤 노력을 했나요?)" 
                id="process" 
                placeholder="조사 과정, 실험, 논문 탐색, 팀원과의 협력 등 구체적인 액션"
                value={formData.process}
                onChange={handleChange}
                required
              />
              <TextArea 
                label="결과 및 변화 (이를 통해 무엇을 배우고 성장했나요?)" 
                id="result" 
                placeholder="깨달은 점, 가치관의 변화, 후속 탐구로 이어진 점 등"
                value={formData.result}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" variant="outline" onClick={() => navigate('/student')}>취소</Button>
            <Button type="button" variant="secondary" onClick={() => alert('임시저장 되었습니다.')}>임시 저장</Button>
            <Button type="submit">최종 제출</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
