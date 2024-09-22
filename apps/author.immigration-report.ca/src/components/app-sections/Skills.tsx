import React, {useEffect, useRef, useState} from 'react';
import {useScreenType} from '../../utils/utils';
import {useWindowSize} from '@uidotdev/usehooks';

const skillsList = [
    'PHP', 'MySql', 'JavaScript', 'TypeScript', 'ReactJs', 'Redux', 'Rest API', 'Swagger', 'OpenAPI V3', 'React Native', 'NodeJS', 'ExpressJs', 'NestJs', 'TypeOrm', 'Sequelize',
    'Agile Development', 'Yii2 Framework', 'Yii Framework', 'Symphony', 'TailwindCSS', 'StoryBook', 'AWS EC2', 'AWS RDS', 'AWS S3', 'AWS SQS', 'AWS Lambda', 'AWS CloudFront',
    'AWS Incognito', 'AWS Console', 'GIT', 'Github', 'GitLab', 'Gitlab CI/CD pipelines', 'Github Actions', 'CSS', 'HTML', 'Jquery', 'Bootstrap', 'Docker', 'PostgreSql'
];

export const SkillBox = ({skill}: {skill:string}) => {
    return <div className={"skills-box-wrapper"}>
        <div className={"skills-box"}>
            <p>{skill}</p>
        </div>
    </div>
}

export const SkillBoxList = ({skillsListData}: {skillsListData:string[]}) => {

    const ref = useRef<any>(null);
    const id = "animatedElement-"+skillsListData[0].replaceAll(' ','_');

    const [style, setStyle] = useState<any>({});
    const [cloneIt, setCloneIt] = useState<number>(0);
    const [doItOnce, setDoItOnce] = useState<boolean>(true);

    useEffect(() => {
        const mount = () => {
            if (doItOnce) {
                setDoItOnce(false);
                setTimeout(() => {
                    if (ref.current && skillsListData.length === Array.from(ref.current.children).length) {
                        const wrapperWidth = ref.current.getBoundingClientRect().width;
                        let start = 0 ;
                        let cloneItInner = 0;
                        Array.from(ref.current.children).forEach((el: any, i) => {
                            // doing it as it has been scaled to 0.9
                            const w = (el.getBoundingClientRect().width / 9) * 10;
                            start += w;
                            start += 32; //flexGap
                            if (start < wrapperWidth) {
                                cloneItInner++;
                            }
                        });
                        setCloneIt(cloneItInner);

                        const widthFinal = start;
                        const styleSheet = document.styleSheets[0]; // Get the first stylesheet in the document
                        // Define a dynamic keyframes name
                        const animationName = `dynamicAnimation-${Math.random().toString(36).substr(2, 9)}`;
                        // Create keyframes dynamically
                        const keyframes = `
      @keyframes ${animationName} {
        0% { transform: translateX(0); }
        100% { transform: translateX(${-1 * ( widthFinal)}px); }
      }
    `;
                        // Insert the keyframes into the stylesheet
                        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                        // ref.current.style.animation = `${animationName} ${length * 4}s linear infinite`;
                        setStyle({
                            animation: `${animationName} 30s linear infinite`
                        })
                    }
                }, 100);
            }
        }
        return mount();
    },[id, doItOnce, skillsListData])

    return <div ref={ref} className={"skills-wrapper"} key={skillsListData[0]} id={id}
        style={style}
    >
            {
                skillsListData.map((skill) => <SkillBox key={skill} skill={skill} />)
            }
            {
                cloneIt > 0 &&  skillsListData.filter((v, i) => i <= cloneIt).map(skill => <SkillBox key={"clone-"+skill} skill={skill} />)
            }
    </div>;
}

const Skills = () => {
    const skillsLength = skillsList.length;
    const { width } = useWindowSize();
    const type = useScreenType(width || 0);
    const deviderObject = {
        "xs": 6,
        "sm": 6,
        "md": 6,
        "lg": 6,
        "xl": 6,
        "2xl": 6,
    };
    const devider = deviderObject[type || 'xl'];
    const skillsListSets = [];
    for (let i = 0 ; i < devider ; i++) {
        skillsListSets.push(skillsList.filter((x, ix) => {
            return (ix >= (i * (skillsLength / devider)) ) && ix < ((i + 1) * (skillsLength / devider) );
        }))
    }

    return (
        <section className={"section section-skills"} >
            <h1>Skills</h1>
            <div className={"section-content section-skills-content"}>
                {
                    skillsListSets.map((skillsListData) => {
                        return skillsListData.length > 0 ? <SkillBoxList key={skillsListData[0]} skillsListData={skillsListData} /> : <></>;
                    })
                }
            </div>
        </section>
    );
}

export default Skills;
