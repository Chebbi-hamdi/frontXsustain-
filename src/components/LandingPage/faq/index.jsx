import React,{useState} from "react";
import './style.css'

export default function FAQ(){
    const [selected , setSelected] = useState(null);
    const toggle = (i) => {
        if(selected === i){
            return setSelected(null)
        }

        setSelected(i)
        
    }
    const data = [
        {
            question: 'Question 1',
            answer: 
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            question: 'Question 2',
            answer: 
            'Answer 2', 
        },
        {
            question: 'Question 3',
            answer: 
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            question: 'Question 4',
            answer: 
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            question: 'Question 5',
            answer: 
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ]
    return(
         <div className="wrapper">
        <p className="TitleFaq">Frequently asked <br></br> <span className="titleBleu">questions</span></p>
        <div className="accordion">
            {data.map((item,i) => (
                <div className="item">
                    <div className="quest-title" onClick={()=>toggle(i)}>
                        <h2 className="Qestion">{item.question}</h2>
                        <span>{selected === i ? '-' : '+'}</span>
                    </div>
                    <div className={selected === i ? 'content show' :'content'}>
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>

       
    )
}

