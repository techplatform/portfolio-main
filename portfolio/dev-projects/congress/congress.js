import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')

seniorButton.addEventListener('click', () => {
    senioritySort()
})

bdayButton.addEventListener('click', () => {
    birthdaySort()
})

function populateCongressGrid(simpPeople) {
    removeChildren(congressGrid)
    simpPeople.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = person.imgURL
        figCaption.textContent = `${person.name}`

        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedCongress(congressPeople) {
    return congressPeople.map(person => {
        let middleName = person.middle_name ? `${person.middle_name}` : ``
        return {
            id: person.id,
            title: person.title,
            name: `${person.first_name} ${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`,
            seniority: parseInt(person.seniority, 10),
//            seniority: parseInt(person.gender, 10),
            date_of_birth: parseInt(person.date_of_birth, 10),
            missed_votes_pct: person.missed_votes_pct,
            votes_with_party_pct: person.votes_with_party_pct
        }
    })
}

function senioritySort() {
     populateCongressGrid(getSimplifiedCongress(senators).sort(
        (a, b) => a.seniority - b.seniority
    ).reverse())
}

function birthdaySort() {
    populateCongressGrid(getSimplifiedCongress(senators).sort(
        (a, b) => a.date_of_birth - b.date_of_birth
    ))
}
populateCongressGrid(getSimplifiedCongress(senators))