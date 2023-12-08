import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 40;
	background-color: rgba(0, 0, 0, 0.56);
	pointer-events: ${(prop) => prop.isOpenModal ? "all" : "none"};
	transition: all 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	bottom: 0rem;
  opacity: ${(prop) => prop.isOpenModal ? "1" : "0"};
`
export const ModalContainer = styled.div`
  box-sizing: border-box;
	max-width: 47.375rem;
	width: 100%;
	min-height: 15.1rem;
	max-height: 36.25rem;
	background: white;
	border-radius: 0.5rem;
	position: relative;
	display: flex;
	flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`

export const Title = styled.h1`

`

export const Body = styled.div`

`

export const IconCloseContainer = styled.div`
  
`
