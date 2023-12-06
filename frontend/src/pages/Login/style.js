import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 30px;
  background-color: #0d0c3a;
  height: 100vh;
  padding: 30px 0;
`
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #d9cd29;
  font-family: "Arimo", sans-serif;
  width: 100%;
  text-align: center;
`
export const Form = styled.form`
  display: flex;
  gap: 1.5em
`
export const Label= styled.label`
  color: #fff;
  font-size: 1.2em;
  margin-right: 2em;
`
export const ErrorMessage = styled.p`
  color: #d9cd29;
  font-size: 1.2em;
`
export const LoginBtn = styled.button`
  background-color: #fff;
  color: #0d0c3a;
  font-weight: 700;
  font-size: 1.1em;
  padding: 0.1em;
  width: 4em;
`

export const RegisterLink = styled.p`
  color: #fff;
  font-size: 1.3em;
  a{
    color: #d9cd29;
    font-size: 1.1em;
  }
`

export const AdminLink = styled.p`
  color: #fff;
  font-size: 1.3em;
  a{
    color: #d9cd29;
    font-size: 1.1em;
  }
`

export const InputLogin = styled.input`
  margin-left: 1.5em;
  height: 2em;
`


