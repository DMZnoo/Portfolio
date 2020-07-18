import React from 'react';
const language = [
    {
        lang: 'devicon-cplusplus-plain-wordmark colored',
        proficiency: 3
    },
    {
        lang: "devicon-python-plain-wordmark colored",
        proficiency: 5
    },
    {
        lang: 'devicon-java-plain-wordmark colored',
        proficiency: 5
    },
    {
        lang: 'devicon-git-plain-wordmark colored',
        proficiency: 5
    },
    {
        lang: 'devicon-postgresql-plain-wordmark colored',
        proficiency: 3
    },
    {
        lang:'devicon-react-original-wordmark colored',
        proficiency: 3
    },
    {
        lang: 'devicon-jquery-plain-wordmark colored',
        proficiency: 5
    },
    {
        lang: 'devicon-gulp-plain colored',
        proficiency: 3
    }

];

const LanguageList = () => {
    const languageList = language.map((item,index)=>{
        return <i className={`${item.lang}`} key={item.lang+index} />
    });
    const proficiencyList = [];
    const grid = [];
    for(let i = 0; i < language.length;i++)
    {
        for(let n = 0; n < language[i].proficiency;n++)
        {
            proficiencyList.push(<div key={language[i].lang+` ${n}`} className="cell"><i className="check icon"></i></div>);

        }
        if(language[i].proficiency < 5)
        {
            const count = 5 - language[i].proficiency;
            for(let y = 0; y < count;y++)
            {
                proficiencyList.push(<div className="cell" key={y+' empty'}><i></i></div>);


            }
        }



    }
    for(let x = 0; x < language.length;x++)
    {
        grid.push(
            <div className="grid assessmentContent">
                <div className="cell">
                    <div>
                        { languageList[x] }
                    </div>
                </div>
                {proficiencyList.slice(x*5,(x*5)+5)}
            </div>
        )
    }
    return (grid);
};

export default LanguageList;
