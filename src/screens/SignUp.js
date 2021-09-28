import React from "react";
import styled from "styled-components";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "./routes";
import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SubTitle = styled.h2`
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: #979797;
  margin-top: 12px;
`;
const SignUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderWrapper>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>친구들의 사진과 동영상을 보려면 가입하세요.</SubTitle>
        </HeaderWrapper>
        <form>
          <Input type="text" placeholder="휴대폰 번호 또는 이메일 주소" />
          <Input type="password" placeholder="성명" />
          <Input type="password" placeholder="사용자 이름" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value="가입" />
        </form>
      </FormBox>
      <BottomBox
        text="계정이 있으신가요?"
        link={routes.home}
        linkText="로그인"
      />
    </AuthLayout>
  );
};

export default SignUp;
