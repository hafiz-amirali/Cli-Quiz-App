import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import chalk from "chalk";

interface Questions {
    question: string;
    choice: string[];
    correctAns: number;
}

const quiz: Questions[] = [
    {
        question: 'What is TypeScript?',
        choice: ['A superset of JavaScript', 'A new programming language', 'A database management system', 'A video game'],
        correctAns: 0,
    },
    {
        question: 'Which company developed TypeScript?',
        choice: ['Google', 'Microsoft', 'Apple', 'Facebook'],
        correctAns: 1,
    },
    {
        question: 'What does "TS" stand for in TypeScript?',
        choice: ['TypeScript', 'TypeSafe', 'TypeScriptScript', 'TypeScripting'],
        correctAns: 0,
    },
    {
        question: 'What feature does TypeScript add to JavaScript?',
        choice: ['Static typing', 'Dynamic typing', 'Functional programming', 'Hardware acceleration'],
        correctAns: 0,
    },
    {
        question: 'Which tool is commonly used for TypeScript development?',
        choice: ['Visual Studio Code', 'Eclipse', 'Sublime Text', 'Notepad'],
        correctAns: 0,
    },
];

async function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

async function main() {
    let rainbowStyle = chalkAnimation.rainbow("\n ___________________ WELCOME TO TYPESCRIPT QUIZ ___________________ \n");
    await sleep();
    rainbowStyle.stop();

    let restart = true;

    while (restart) {
        const quizQuestions = getQuestions();
        let score = 0;

        for (const question of quizQuestions) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'userAnswer',
                    message: question.question,
                    choices: question.choice,
                },
            ]);

            const userAnswerIndex = question.choice.indexOf(answers.userAnswer);

            if (userAnswerIndex === question.correctAns) {
                console.log(chalk.green('Correct!\n'));
                score++;
            } else {
                console.log(chalk.red(`Wrong Answer. The correct answer is: ${chalk.bold(question.choice[question.correctAns])}\n`));
            }
        }

        console.log(chalk.blue(`Quiz completed! Your Total Score: ${score}/${quizQuestions.length}`));

        const restartAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'restart',
                message: 'Do you want to restart the quiz?',
                default: true,
            },
        ]);

        restart = restartAnswer.restart;

        if (restart) {
            console.log('Restarting Quiz! \n');
        }
    }

    console.log('Thanks for attempting the TypeScript Quiz.');
}

function getQuestions(): Questions[] {
    return quiz;
}

main();
