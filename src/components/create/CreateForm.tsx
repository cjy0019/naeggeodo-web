import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

import CreateTabMenu from './CreateTabMenu';
import { useCreateNaeggeotalk } from '../../hooks/useCreateNaeggeotalk';

interface MoveLinkProps {
  isUrl: boolean;
}

const CreateForm = () => {
  const {
    storeLink,
    storeName,
    tags,
    maxCount,
    tagText,
    setTagText,
    dispatchAddTag,
    dispatchChangeStoreName,
    dispatchChangeStoreLink,
    dispatchMinusMaxCount,
    dispatchPlusMaxCount,
  } = useCreateNaeggeotalk();

  const urlRegex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
  const [isUrl, setIsUrl] = useState<boolean>(false);

  return (
    <Container>
      <div>
        <CreateTabMenu />
        <Content>
          <Item>
            <TitleWrapper>
              <Title>가게명</Title>
              <OrangeStar>*</OrangeStar>
            </TitleWrapper>
            <Input
              type='text'
              onChange={dispatchChangeStoreName}
              value={storeName}
              placeholder='가게 이름을 입력해주세요.'
            />
          </Item>
          <Item>
            <Title>가게 링크</Title>
            <InputWrapper>
              <Input
                type='text'
                placeholder='가게 링크를 입력해주세요'
                value={storeLink}
                onChange={(e) => {
                  setIsUrl(urlRegex.test(storeLink));
                  dispatchChangeStoreLink(e);
                }}
              />
              <MoveLinkButton isUrl={isUrl}>링크이동</MoveLinkButton>
            </InputWrapper>
          </Item>
          <Item>
            <TagTitle>
              <Title>태그</Title>
              <SmallText>ex. 음식명, 카테고리명</SmallText>
            </TagTitle>
            <form onSubmit={(e) => dispatchAddTag(e)}>
              <Input
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
                placeholder='태그 작성 후 Enter를 입력하세요.'
              />
            </form>
            <TagContainer>
              {tags.map((tag, i) => (
                <TagButton key={i}>
                  <span>{tag}</span>
                  <img src='/assets/images/buttonclose.svg' alt='닫기 버튼' />
                </TagButton>
              ))}
            </TagContainer>
          </Item>

          <ChatRoomContainer>
            <TitleWrapper>
              <Title>채팅방 입장 인원</Title>
              <Desc>(최대5명)</Desc>
            </TitleWrapper>

            <CounterContainer>
              <PlusMinusButton
                style={
                  maxCount <= 5 && maxCount > 1
                    ? { color: `${palette.black}` }
                    : { color: `${palette.TextGray}` }
                }
                onClick={dispatchMinusMaxCount}>
                -
              </PlusMinusButton>
              <div>{maxCount}</div>
              <PlusMinusButton
                style={
                  maxCount < 5 && maxCount >= 1
                    ? { color: `${palette.black}` }
                    : { color: `${palette.TextGray}` }
                }
                onClick={dispatchPlusMaxCount}>
                +
              </PlusMinusButton>
            </CounterContainer>
          </ChatRoomContainer>
        </Content>
      </div>

      <CreateButton disabled={storeName.length < 2}>
        내꺼톡 생성하기
      </CreateButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;

const Content = styled.div`
  margin-top: 19.5px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px 0;
  border-bottom: 1px solid #f2f2f8;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.p`
  font-family: 'SpoqaBold';
`;

const OrangeStar = styled.span`
  font-weight: 500;
  font-size: 0.9375rem;

  color: ${palette.mainOrange};
`;

const Input = styled.input`
  line-height: 16px;
  font-size: 0.9375rem;
  color: ${palette.DarkGray};
  width: 80%;

  outline: none;
  border: none;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Desc = styled.p`
  font-weight: 500;
  font-size: 0.9375rem;

  color: ${palette.DarkGray};
`;

const TagTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const TagButton = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  gap: 4px;

  font-weight: 500;
  font-size: 0.75rem;

  display: flex;
  align-items: center;

  color: #191919;

  padding: 4px 10px;

  background-color: ${palette.LightGray2};
  border-radius: 5px;

  cursor: pointer;
`;

const SmallText = styled.p`
  display: flex;
  align-items: center;

  font-weight: 500;
  font-size: 0.75rem;
  color: ${palette.black};
`;

const ChatRoomContainer = styled(Item)`
  flex-direction: row;
  justify-content: space-between;

  border-bottom: none;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  font-weight: 500;
  font-size: 1.25rem;
  color: ${palette.black};
`;

const PlusMinusButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;

  color: ${palette.TextGray};

  background-color: ${palette.LightGray2};
  border-radius: 5px;
`;

const CreateButton = styled.button`
  all: unset;
  height: 52px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 1.0625rem;
  color: #ffffff;

  border-radius: 10px;
  background-color: ${palette.black};

  transition: 0.5s;
  cursor: pointer;

  &:disabled {
    background-color: ${palette.LineGray};
    cursor: not-allowed;
  }
`;

const MoveLinkButton = styled.button<MoveLinkProps>`
  all: unset;
  display: flex;
  justify-content: center;

  visibility: hidden;
  opacity: 0;
  width: 63px;

  padding: 4px 0;

  font-weight: 500;
  font-size: 0.75rem;
  color: ${palette.mainOrange};

  background-color: ${palette.LightGray2};
  border-radius: 5px;

  cursor: pointer;
  transition: 1s;

  ${(props) =>
    props.isUrl &&
    css`
      display: flex;
      visibility: visible;
      opacity: 1;
    `}
`;

export default CreateForm;
