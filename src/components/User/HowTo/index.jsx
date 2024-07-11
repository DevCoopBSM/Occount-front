import React from "react";
import { useNavigate } from 'react-router-dom';
import AriPayLogo from '../../../assets/AriPayL_ver2.svg';
import Money from '../../../assets/money3.png';
import YellowArrow from '../../../assets/YellowArrow.svg';
import guide1 from '../../../assets/guide1.png';
import guide2 from '../../../assets/guide2.png';
import guide3 from '../../../assets/guide3.png';
import Mac from '../../../assets/mac.png';
import * as S from "./style";
import { Button } from "components/Toss/style";

function HowTo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const offset = 160; // Header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

    const openNewTab = () => {
      window.open('https://occount.bsm-aripay.kr/', '_blank');
    };

  return (
    <S.HowToContainer>
      <S.Header>
        <S.LogoImg src={AriPayLogo} alt="logo image" onClick={handleLogoClick} />
      </S.Header>
      <S.ScrollButtons>
        <S.ScrollButton onClick={() => scrollToSection('section1')}>1</S.ScrollButton>
        <S.ScrollButton onClick={() => scrollToSection('section2')}>2</S.ScrollButton>
        <S.ScrollButton onClick={() => scrollToSection('section3')}>3</S.ScrollButton>
        {/* 필요한 섹션에 대한 버튼을 추가합니다 */}
      </S.ScrollButtons>
      <S.Content>
        <S.ImageTextWrapper>
          {/* #1 */}
          <S.ImageTextBlock id="section1">
            <S.Image src={AriPayLogo} alt="AriPay logo" />
            <S.Text1 style={{textAlign:'left'}}>
              내 학생증 안에 작은 지갑,
              <br/><span style={{ marginBottom : '100px'}}>아리페이</span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #2 */}
          <S.ImageTextBlock>
            <S.Image src={AriPayLogo} alt="AriPay logo" />
            <S.Text1>
              <span>가 무엇인가요?</span>
            </S.Text1>
          </S.ImageTextBlock>
          
            <S.Text1>
              <span style={{ fontSize: '28px', fontWeight: '700'}}>아리페이란 공간 아리소리( 매점 )에서 사용하는 포인트에요!<br/>
              학생증에 매점 상품권이나 현금으로 충전해 사용할 수 있어요.</span>
            </S.Text1>
       
          {/* #3 */}
          <S.ImageTextBlock id="section2">
            <S.Image src={AriPayLogo} alt="AriPay logo" />
            <S.Text1>
              <span>는 어떻게 충전하나요?</span>
            </S.Text1>
          </S.ImageTextBlock>
            <S.Text1>
              <span style={{ fontSize: '30px', fontWeight: '700'}}>아리페이를 충전하는 법은 두 가지가 있어요.<br/>
              알이와 같이 알아볼까요?</span>
            </S.Text1>

          {/* #4 */}
          <S.ImageTextBlock>
            <S.Image src={Money} alt="Money3" />
            <S.Text1>
              <span>1. 매점 직접 방문하기</span>
              <br/><span style={{ fontSize: '30px', fontWeight: '700'}}>
                교내 2층 매점에서 매점부원에게<br/>
                사용자의 본인 학생증과 함께<br/>
                원하는 충전 금액을 현금으로<br/>
                지불하면 충전 완료!
              </span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #5 */}
          <S.ImageTextBlock>
            <S.Text1>
              https://occount.bsm-aripay.kr/<br/>
              <span style={{ fontSize: '40px', fontWeight: '900'}}>아리페이 웹으로 접속 후 로그인</span><br/>
              <S.Image src={YellowArrow} alt="YellowArrow" style={{ width:'10%', margin:'50px'}} />
              <br/><span style={{ fontSize: '30px', fontWeight: '700'}}>
                현재 아리페이 잔액 옆에 위치한<br/>
                충전하기 버튼을 클릭
              </span>
            </S.Text1>
            <S.GuideImage src={guide1} alt="guide1" />
          </S.ImageTextBlock>
          
          {/* #6 */}
          <S.ImageTextBlock>
          <S.GuideImage src={guide2} alt="guide2" style={{marginRight:'150px'}} />
            <S.Text1>
              <span style={{ fontSize: '30px', fontWeight: '700'}}>
                원하는 충전 금액 입력 후<br/>
                결제 진행
              </span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #7 */}
          <S.ImageTextBlock>
            
            <S.Text1>
                <span style={{ fontSize: '30px', fontWeight: '700'}}>
                학생의 경우,<br/>
                일반 결제와 정기 결제 중<br/>
                <b style={{fontWeight:'900'}}>일반 결제</b>를 이용해주세요!
              </span>
            </S.Text1>
            <S.GuideImage src={guide3} alt="guide3" style={{marginLeft:'150px;'}}/>
          </S.ImageTextBlock>
          
          {/* #8 */}
          <S.ImageTextBlock id="section3">
            <S.Image src={AriPayLogo} alt="AriPay logo" />
            <S.Text1>
              <span>는 어떻게 사용해요?</span>
            </S.Text1>
          </S.ImageTextBlock>
            <S.Text1>
              <span style={{ fontSize: '20px', fontWeight: '700'}}>매점 내에서 사용 가능합니다!<br/>
              카운터나 키오스크를 이용해서 사용할 수 있어요!<br/>
              어떻게 사용하는 지 알이가 알려드릴게요.</span>
            </S.Text1>
          
          {/* #9 */}
          <S.ImageTextBlock style={{margin: '100px'}}>
            <S.Text1>
              <span>1. 카운터에서</span><br/>
              <span style={{ fontSize: '24px', fontWeight: '700'}}>
                매점 카운터에서 계산할 때에는 아리페이를 사용함을 밝히고,<br/>
                매점부원의 안내에 따라 학생증 바코드를 리더기에 입력하세요.
              </span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #10 */}
          <S.ImageTextBlock>
            <S.Text1>
              <span>2. 키오스크에서</span><br/>
              <span style={{ fontSize: '24px', fontWeight: '700'}}>
                바코드 리더기에 학생증 바코드를 입력한 후,<br/>
                핀 번호 4자리를 입력하여 로그인해요.<br/>
                이후 결제할 상품의 바코드를 찍어<br/>
                결제하기 버튼을 누르면 결제 완료!
              </span><br/>
              <span style={{ fontSize: '18px', fontWeight: '700'}}>
                초기 핀번호는 1234입니다!<br/>
                이를 변경한 후 결제가 가능합니다.
              </span>
            </S.Text1>
            <S.Image src={Mac} alt="맥북은쓰레기야" />
          </S.ImageTextBlock>

          {/* #End */}
          <S.ImageTextBlock>
            <S.Image src={AriPayLogo} alt="AriPay logo" />
            <S.Text1 style={{textAlign:'left'}}>
              내 학생증 안에 작은 지갑,
              <br/><span >아리페이</span>
              <S.Button onClick={openNewTab}>사용하러 가기</S.Button>
            </S.Text1>
            
            
          </S.ImageTextBlock>
          
          <S.LTText1>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>
              아리페이란 공간 아리소리( 이하 매점 )에서 사용하는 포인트입니다.<br/>
              <br/>
              충전 환불은 충전 후 일주일 내로 가능합니다.<br/>
              현재 사용 금액이 충전했던 금액 이상일 경우에만 충전 결제를 취소할 수 있습니다.<br/><br/>
              아리페이의 일일 충전 한도는 5만원입니다.<br/><br/>
              아리페이는 환전, 조합원 간 양도 및 교환이 불가하며,<br/>
              소유자가 직접 식품, 잡화 등 매점에서 판매하는 물품을 구매하는 용도로만 사용해야 합니다.<br/><br/>
              아리페이의 유지 기간은 충전한 시점부터 조합원 자격을 유지하는 동안 모두 소진하기 전까지이며( 최대 3년 ),<br/>
              조합 탈퇴 및 졸업 등으로 조합원 자격 상실 시 환불 사유에 해당하는 내용 이외에는 전액 소멸됩니다.<br/>
            </span>
          </S.LTText1>
        </S.ImageTextWrapper>
      </S.Content>
      <S.Footer>
        <S.FooterText>
          상호: 부산소마고 사회적협동조합<br/>
          대표: 김민경(이사장)<br/>
          사업자 등록번호: 214-82-16238<br/>
          주소: 부산광역시 강서구 가락대로 1393 부산소프트웨어마이스터고 융합관 공간-아리소리<br/>
          전화번호: 051-970-1709<br/>
          INSTA | GITHUB
        </S.FooterText>
      </S.Footer>
    </S.HowToContainer>
  );
}

export default HowTo;
