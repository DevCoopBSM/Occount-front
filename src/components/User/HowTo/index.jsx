import React from "react";

import assets from 'assets';
import * as S from "./style";


function HowTo() {


  const handleLogoClick = () => {
    window.location.href = '/';
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
        <S.LogoImg src={assets.AriPayLogo} alt="logo image" onClick={handleLogoClick} />
      </S.Header>
      <S.ScrollButtons>
        <S.ScrollButton onClick={() => scrollToSection('section1')}>시작</S.ScrollButton>
        <S.ScrollButton onClick={() => scrollToSection('section2')}>아리페이란?</S.ScrollButton>
        <S.ScrollButton onClick={() => scrollToSection('section3')}>충전방법</S.ScrollButton>
        <S.ScrollButton onClick={() => scrollToSection('section8')}>사용방법</S.ScrollButton>
        <S.ScrollButton onClick={() => scrollToSection('section12')}>환불방법</S.ScrollButton>
      </S.ScrollButtons>
      <S.Content>
        <S.ImageTextWrapper id="section1">
          {/* #1 */}
          <S.ImageTextBlock >
            <S.Image src={assets.AriPayLogo} alt="AriPay logo" />
            <S.Text1 style={{textAlign:'left'}}>
              내 학생증 안에 작은 지갑,
              <br/><span style={{ marginBottom : '100px'}}>아리페이</span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #2 */}
          <S.ImageTextBlock id="section2">
            <S.Image src={assets.AriPayLogo} alt="AriPay logo" />
            <S.Text1>
              <span>가 무엇인가요?</span>
            </S.Text1>
          </S.ImageTextBlock>
          
            <S.Text1>
              <span style={{ fontSize: '28px', fontWeight: '700'}}>아리페이란 공간 아리소리( 매점 )에서 사용하는 포인트에요!<br/>
              학생증에 매점 상품권이나 현금으로 충전해 사용할 수 있어요.</span>
            </S.Text1>
       
          {/* #3 */}
          <S.ImageTextBlock id="section3">
            <S.Image src={assets.AriPayLogo} alt="AriPay logo" />
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
            <S.Image src={assets.Money} alt="Money3" />
            <S.Text1>
              <span>1. 교내 행사 적극 참여하기</span>
              <br/><span style={{ fontSize: '30px', fontWeight: '700'}}>
                교내 각종행사에서 참가하여 아리페이를 시상을 받게되면<br/>
                예산 품의 및 사용 이 이뤄진 후 본인 계정에 충전이 됩니다!<br/>
              </span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #5 */}
          <S.ImageTextBlock>
            <S.Text1>
            <span>2. 웹에서 직접 충전하기</span><br/>
              https://occount.bsm-aripay.kr/<br/>
              <span style={{ fontSize: '40px', fontWeight: '900'}}>아리페이 웹으로 접속 후 로그인</span><br/>
              <S.Image src={assets.YellowArrow} alt="YellowArrow" style={{ width:'10%', margin:'50px'}} />
              <br/><span style={{ fontSize: '30px', fontWeight: '700'}}>
                현재 아리페이 잔액 옆에 위치한<br/>
                충전하기 버튼을 클릭
              </span>
            </S.Text1>
            <S.GuideImage src={assets.guide1} alt="guide1" />
          </S.ImageTextBlock>
          
          {/* #6 */}
          <S.ImageTextBlock>
          <S.GuideImage src={assets.guide2} alt="guide2" style={{marginRight:'150px'}} />
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
                바로 충전하는 경우 <b style={{fontWeight:'900', color:'red'}}>일반결재</b>,<br/>
                {/* 일정 금액 이하로 떨어졌을때 자동추전을 원하면<br/>
                <b style={{fontWeight:'900', color:'red'}}>정기 결제</b>*/}를 이용해주세요! 
              </span>
            </S.Text1>
            <S.GuideImage src={assets.guide3} alt="guide3" style={{marginLeft:'150px;'}}/>
          </S.ImageTextBlock>
          
          {/* #8 */}
          <S.ImageTextBlock id="section8">
            <S.Image src={assets.AriPayLogo} alt="AriPay logo" />
            <S.Text1>
              <span>는 어떻게 사용해요?</span>
            </S.Text1>
          </S.ImageTextBlock>
          <span style={{ fontSize: '24px', fontWeight: '700'}}>매점 내에서 사용 가능합니다!<br/>
              카운터나 키오스크를 이용해서 사용할 수 있어요!<br/>
              어떻게 사용하는 지 알이가 알려드릴게요.</span>

          
          {/* #9 */}
          <S.ImageTextBlock>
          <S.Image src={assets.AriSoriCounter} />
            <S.Text1>
              <span>1. 카운터에서</span><br/>
              <span style={{ fontSize: '24px', fontWeight: '700'}}>
                매점 카운터에서 계산할 때 <b style={{fontWeight:'900', color:'red'}}>아리페이를 사용함</b>을 밝히고,<br/>
                매점부원의 안내에 따라  <b style={{fontWeight:'900', color:'red'}}>학생증 바코드</b>를 리더기에 입력하세요.<br/>
                다른 결재수단과 <b style={{fontWeight:'900', color:'red'}}>복합결재도 가능</b>합니다.
              </span>
            </S.Text1>
          </S.ImageTextBlock>

         {/* #11 */}
         <S.ImageTextBlock>
            <S.Text1>
              <span>2. 키오스크에서</span><br/>
              <span style={{ fontSize: '24px', fontWeight: '700'}}>
                바코드 리더기에 <b style={{fontWeight:'900', color:'red'}}>학생증 바코드</b>를 입력한 후,<br/>
                <b style={{fontWeight:'900', color:'red'}}>pin</b>번호를 입력하여 로그인해요.<br/>
                이후 결제할 <b style={{fontWeight:'900', color:'red'}}>상품의 바코드</b>를 찍어<br/>
                <b style={{fontWeight:'900', color:'red'}}>결제하기</b> 버튼을 누르면 결제 완료!
              </span><br/>
              <span style={{ fontSize: '18px', fontWeight: '700'}}>
                초기 핀번호는 <b style={{fontWeight:'900', color:'red'}}>1234</b>입니다!<br/>
                이를 변경한 후 키오스크 이용이 가능합니다.
              </span>
            </S.Text1>
            <S.Image src={assets.Mac} />
          </S.ImageTextBlock>


          {/* #12 */}
          <S.ImageTextBlock id="section12">
            <S.Image src={assets.AriPayLogo} alt="AriPay logo" />
            <S.Text1>
              <span>환불은 언제 가능하죠?</span>
            </S.Text1><br/>
          </S.ImageTextBlock>
          <S.Text1>
              <span style={{ fontSize: '30px', fontWeight: '700'}}>아리페이의 환불조건은 다음과 같아요<br/>
              1. <b style={{fontWeight:'900', color:'red'}}>직접 웹으로 충전한 내역</b>에 대해 환불 신청이 가능해요<br/>
              2. 충전한지 <b style={{fontWeight:'900', color:'red'}}>1주일 이내</b>여야 해요<br/>
              3. 환불신청하는 시점에 <b style={{fontWeight:'900', color:'red'}}>보유한 포인트가 환불받고자 하는 포인트 이상</b>이어야 해요<br/>
              </span>
          </S.Text1>


          {/* #13 */}
          <S.ImageTextBlock>        
            <S.GuideImage src={assets.refund1} alt="refund1" style={{marginLeft:'150px;'}}/>
            <S.Text1>
              <span style={{ fontSize: '30px', fontWeight: '700'}}>
              "거래 내역 및 충전 환불" 버튼을 누르면<br/></span>
            </S.Text1>
          </S.ImageTextBlock>

          {/* #14 */}
          <S.ImageTextBlock>
            <S.GuideImage src={assets.refund2} alt="refund2" style={{marginLeft:'150px;'}}/>
            <S.Text1>
              <span style={{ fontSize: '30px', fontWeight: '700'}}>
              환불조건에 맞는 충전내역은 파란색으로 떠요<br/>
              환불받고자 하는 충전내역을 누르고<br/>
              "환불하기" 버튼을 누르면 환불 신청 완료!
            </span><br/>
            <span style={{ fontSize: '24px', fontWeight: '700'}}>
              만일 조건에 모두 부합한 상황에서 환불이 진행되지 않는 경우<br/>
              메인 화면의 <b style={{fontWeight:'900', color:'red'}}>문의하기</b>를 이용하여 접수해주시면 신속하게 처리해드리겠습니다.
            </span>
          </S.Text1>
        </S.ImageTextBlock>


          {/* #End */}
          <S.ImageTextBlock>
            <S.Image src={assets.AriPayLogo} alt="AriPay logo" />
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
              충전에 대한 환불은 충전 후 일주일 내로 가능합니다.<br/>
              현재 보유한 포인트가 충전했던 포인트보다 많은 경우에만 충전 결제를 취소할 수 있습니다.<br/><br/>
              아리페이의 일일 충전 한도는 5만원입니다.<br/><br/>
              아리페이는 환전, 조합원 간 양도 및 교환이 불가하며,<br/>
              소유자가 직접 식품, 잡화 등 매점에서 판매하는 물품을 구매하는 용도로만 사용해야 합니다.<br/><br/>
              아리페이의 유지 기간은 충전한 시점부터 조합원 자격을 유지하는 동안 모두 소진하기 전까지이며( 최대 3년 ),<br/>
              조합 탈퇴 및 졸업 등으로 조합원 자격 상실 시 포인트는 전액 소멸됩니다.<br/>
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
