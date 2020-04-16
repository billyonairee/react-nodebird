import React, { useState, useCallback } from 'react';
import { Input, Form, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';

const TextInput = ({value}) => {
    return (
        <div>{value}</div>
    )

}

TextInput.propTypes = {
    value: PropTypes.string,
}

export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
};

const Signup = () => {
	const [passwordCheck, setPasswordCheck] = useState('');
	const [term, setTerm] = useState(false);
	const [PasswordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);

	// custom hook //

	const [id, onChangeId] = useInput('');
	const [nick, onChangeNick] = useInput('');
	const [password, onChangePassword] = useInput('');

	const onSubmit = useCallback(
		() => {
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
		},
		[password, passwordCheck, term]
	);

	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordError(e.target.value !== password);
			setPasswordCheck(e.target.value);
		},
		[password]
	);

	const onChangeTerm = useCallback((e) => {
		setTerm(e.target.checked);
	}, []);

	return (
		<>
			<Form onFinish={onSubmit} style={{ padding: 10 }}>
                <TextInput value="123"/>
				<div>
					<label htmlFor="user-id">아이디</label>
					<br />
					<Input name="user-id" value={id} required onChange={onChangeId} />
				</div>
				<div>
					<label htmlFor="user-nick">닉네임</label>
					<br />
					<Input name="user-nick" value={nick} required onChange={onChangeNick} />
				</div>
				<div>
					<label htmlFor="user-pass">비밀번호</label>
					<br />
					<Input
						name="user-password"
						type="password"
						value={password}
						required
						onChange={onChangePassword}
					/>
				</div>
				<div>
					<label htmlFor="user-password-check">비밀번호체크</label>
					<br />
					<Input
						name="user-password-check"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
				</div>
				{PasswordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						약관동의
					</Checkbox>
					{termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit">
						가입하기
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
