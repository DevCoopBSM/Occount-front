import * as S from './style';
import OccountLogo from 'assets/occount-logo.svg';
import Icon from 'components/Icon';

function Footer() {
  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <S.FooterContent>
        <S.InfoContainer>
          <S.Logo>
            <img src={OccountLogo} alt="Occount" />
          </S.Logo>
          <S.AddressText>
            부산광역시 강서구 가락대로 1393 부산소프트웨어마이스터고<br />
            융합관 공간-아리소리
          </S.AddressText>
          <S.InfoLabelContainer>
            <S.InfoLabel>
              <S.InfoLabelTitle>사회적협동조합 대표</S.InfoLabelTitle>
              <S.InfoLabelValue>김민경</S.InfoLabelValue>
            </S.InfoLabel>
            <S.InfoLabel>
              <S.InfoLabelTitle>사업자 등록번호</S.InfoLabelTitle>
              <S.InfoLabelValue>214-82-16238</S.InfoLabelValue>
            </S.InfoLabel>
            <S.InfoLabel>
              <S.InfoLabelTitle>전화번호</S.InfoLabelTitle>
              <S.InfoLabelValue>051-970-1709</S.InfoLabelValue>
            </S.InfoLabel>
          </S.InfoLabelContainer>
        </S.InfoContainer>

        <S.UtilityLinkContainer>
          <S.UtilityLink>
            <S.UtilityLinkText>문의 및 건의</S.UtilityLinkText>
            <Icon name="chevronForward" size={24} color="#ffffff" />
          </S.UtilityLink>
          <S.UtilityLink>
            <S.UtilityLinkText>GITHUB</S.UtilityLinkText>
            <Icon name="externalLink" size={24} color="#ffffff" />
          </S.UtilityLink>
        </S.UtilityLinkContainer>
      </S.FooterContent>

      <S.FooterDivider />

      <S.BottomSection>
        <S.PolicyLinks>
          <S.PolicyLink>오카운트 소개</S.PolicyLink>
          <S.PolicyLink>이용 약관</S.PolicyLink>
        </S.PolicyLinks>
        <S.Copyright>부산소프트웨어마이스터고등학교</S.Copyright>
      </S.BottomSection>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
}

export default Footer;
