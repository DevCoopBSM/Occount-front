import React, { useEffect, useRef, useState } from 'react';
import * as G from '../../../common/GlobalStyle';
import * as S from './style';

function HowTo() {
  const sectionsRef = useRef([]);
  const [isRotating, setIsRotating] = useState(false);

  // 컴포넌트 마운트 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleOringClick = () => {
    if (!isRotating) {
      setIsRotating(true);
      // 애니메이션이 끝나면 상태를 리셋
      setTimeout(() => {
        setIsRotating(false);
      }, 800);
    }
  };


  return (
    <S.HowToContainer>
      {/* 히어로 섹션 */}
      <S.HeroSection ref={(el) => el && (sectionsRef.current[0] = el)}>
        <S.HeroContent>
          <S.HeroLogo src="/assets/OccountLogo.svg" alt="Occount logo" />
          <S.HeroTitle>
            내 학생증 안에 작은 지갑, <S.BrandName>오카운트</S.BrandName>
          </S.HeroTitle>
          <S.HeroDescription>BSSM 디지털 포인트 서비스</S.HeroDescription>
          <S.CTAButton onClick={handleHomeClick}>
            잔액 확인하러 가기
          </S.CTAButton>
        </S.HeroContent>
      </S.HeroSection>

      {/* 오카운트 소개 섹션 */}
      <S.Section ref={(el) => el && (sectionsRef.current[1] = el)}>
        <S.SectionHeader>
          <S.CharacterWrapper>
            <S.Firework>🎉</S.Firework>
            <S.CharacterIcon
              src="/assets/happyOring.svg"
              alt="Happy Oring Character"
              $isRotating={isRotating}
              onClick={handleOringClick}
            />
            <S.Firework>🎉</S.Firework>
          </S.CharacterWrapper>
          <S.SectionTitle>오카운트가 무엇인가요?</S.SectionTitle>
          <S.SectionDescription>
            오카운트는 공간 아리소리(매점)에서 사용하는 포인트 시스템입니다.
            <br />
            학생증으로 간편하게 결제하고 잔액을 확인할 수 있어요.
          </S.SectionDescription>
        </S.SectionHeader>
      </S.Section>

      {/* 포인트 획득 방법 섹션 */}
      <S.Section ref={(el) => el && (sectionsRef.current[2] = el)}>
        <S.SectionHeader>
          <S.SectionTitle>포인트 획득 방법</S.SectionTitle>
          <S.SectionDescription>
            오카운트 포인트를 받는 방법을 알아보세요
          </S.SectionDescription>
        </S.SectionHeader>

        <S.FeatureGrid>
          <S.FeatureCard>
            <S.FeatureIcon src="/assets/Money.png" alt="교내 행사" />
            <S.FeatureTitle>교내 행사 참여</S.FeatureTitle>
            <S.FeatureDescription>
              교내 각종 행사, 특별한 활동이나 기여에 참가하여 포인트를 받을 수 있습니다
            </S.FeatureDescription>
          </S.FeatureCard>
        </S.FeatureGrid>
      </S.Section>

      {/* 잔액 확인 가이드 섹션 */}
      <S.Section ref={(el) => el && (sectionsRef.current[3] = el)}>
        <S.SectionHeader>
          <S.SectionTitle>잔액 확인 방법</S.SectionTitle>
        </S.SectionHeader>

        <S.StepContainer>
          <S.StepItem>
            <S.StepNumber>1</S.StepNumber>
            <S.StepImage src="/assets/howto1.png" alt="로그인" large />
            <S.StepDescription>
              오카운트 웹사이트에 로그인하세요
            </S.StepDescription>
          </S.StepItem>

          <S.StepItem>
            <S.StepNumber>2</S.StepNumber>
            <S.StepImage src="/assets/howto2.png" alt="잔액 확인" />
            <S.StepDescription>
              메인 페이지에서 현재 잔액을 확인할 수 있습니다
            </S.StepDescription>
          </S.StepItem>

          <S.StepItem>
            <S.StepNumber>3</S.StepNumber>
            <S.StepImage src="/assets/howto3.png" alt="사용내역" />
            <S.StepDescription>
              사용내역 보기에서 포인트 적립 및 사용 내역을 확인하세요
            </S.StepDescription>
          </S.StepItem>
        </S.StepContainer>
      </S.Section>

      {/* 사용 방법 섹션 */}
      <S.Section ref={(el) => el && (sectionsRef.current[4] = el)}>
        <S.SectionHeader>
          <S.SectionTitle>사용 방법</S.SectionTitle>
          <S.SectionDescription>
            매점에서 간편하게 사용하는 방법
          </S.SectionDescription>
        </S.SectionHeader>

        <S.UsageGrid>
          <S.UsageCard>
            <S.UsageIcon src="/assets/AriSoriCounter.jpg" alt="카운터 결제" />
            <S.UsageTitle>카운터에서 결제</S.UsageTitle>
            <S.UsageDescription>
              카운터에서 오카운트 사용을 말씀하시고
              <br />
              학생증 바코드를 리더기에 입력하세요
            </S.UsageDescription>
          </S.UsageCard>

          <S.UsageCard>
            <S.UsageIcon src="/assets/Mac.png" alt="키오스크 결제" />
            <S.UsageTitle>키오스크에서 결제</S.UsageTitle>
            <S.UsageDescription>
              키오스크에서 PIN 번호를 입력하여
              <br />
              로그인하고 결제하세요
            </S.UsageDescription>
          </S.UsageCard>
        </S.UsageGrid>
      </S.Section>

      {/* CTA 섹션 */}
      <S.CTASection ref={(el) => el && (sectionsRef.current[5] = el)}>
        <S.CTAContent>
          <S.CTATitle>지금 바로 오카운트를 시작해보세요!</S.CTATitle>
          <S.CTAButton onClick={handleHomeClick} primary>
            잔액 확인하기
          </S.CTAButton>
          <S.CTATerms>
            오카운트는 공간 아리소리(매점)에서 사용하는 포인트입니다. • 포인트는 교내 행사 참여를 통해 획득할 수 있습니다. • 환전, 조합원 간 양도 및 교환이
            불가합니다. • 조합원 자격 상실 시 포인트는 전액 소멸됩니다.
          </S.CTATerms>
        </S.CTAContent>
      </S.CTASection>

      {/* 여백 섹션 */}
      <S.SpacerSection />
    </S.HowToContainer>
  );
}

export default HowTo;
