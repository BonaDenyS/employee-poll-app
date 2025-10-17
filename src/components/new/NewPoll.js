import { useState } from 'react';
import "./NewPoll.css";
import { handleAddQuestion } from '../../actions/questions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewPoll = ({ dispatch }) => {
    const navigate = useNavigate();
    const [optionOneText, setOptionOne] = useState('');
    const [optionTwoText, setOptionTwo] = useState('');

    const isDisabled = optionOneText.trim() === '' || optionTwoText.trim() === '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDisabled) return;

        dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
        navigate("/");
    };

    return (
        <div className="newpoll-container">
            <h1>Would You Rather</h1>
            <h5>Create Your Own Poll</h5>
            <form className="poll-form" onSubmit={handleSubmit}>
                <label htmlFor="optionOne">First Option</label>
                <input
                    type="text"
                    id="optionOne"
                    placeholder="Option One"
                    value={optionOneText}
                    onChange={(e) => setOptionOne(e.target.value)}
                />
                <label htmlFor="optionTwo">Second Option</label>
                <input
                    type="text"
                    id="optionTwo"
                    placeholder="Option Two"
                    value={optionTwoText}
                    onChange={(e) => setOptionTwo(e.target.value)}
                />
                <button type="submit" disabled={isDisabled}>Submit</button>
            </form>
        </div>
    );
};

export default connect()(NewPoll);