/* eslint-disable no-unused-vars */
import { Candidate } from '../common/model.js';

/**
 * Part 2: Duplicate Candidate Detection
 * ------------------------------------------
 *
 * One of the challenges when building an ATS is preventing duplicate entries in the candidate database.
 * We want to prevent scenarios where the same person, knowingly or otherwise, get registered multiple times using different
 * phone numbers or email.
 * This is especially difficult with Ethiopian names where the same name can be written in different ways:
 * - eg: ብርሃኔ = Berhane, Birhane, Birhanie, Birhanne etc
 * - eg: ብስራት = Bisrat, Bsrat, Besrat, Bsrate, Bissrat
 * - eg: አብረሃም = Abreham, Abrham, Abraham, Abriham
 */

/**
 * One strategy for detecting duplicate names is to compare normalized versions of each name.
 * 1. Vowels are often used interchangeably, so we will remove all instances of vowels, ** EXCEPT in the first character **.
 *      eg. Abreham -> Abrhm, Birhanie -> Brhn
 * 2. We will remove double letters. Eg. Bissrat -> Bssrt -> Bsrt
 * 3. We'll remove all non-character letters, eg. spaces, '-' or '/'; Wolde Mariam -> Wld Mrm -> Wldmrm
 * 3. we'll make all characters uppercase. Abreham -> Abrhm -> ABRHM
 *
 * This function returns a normalized version of the given string, according to the
 * above rules.
 *
 * @param {String} name
 * @returns String
 */
const normalizedName = (name) => {
      name = name.replace(/[^a-zA-Z]/gi, "")
      name = name.toUpperCase();
  let charArray = [... name];
  let noRedendent = []
      for( let index = 0; index < charArray.length; index++){
        if(charArray[index] !== charArray[index + 1]){
          noRedendent.push((charArray[index]))
        }
      }
  let firstElement = noRedendent[0]
      noRedendent.shift()
  const newArray = noRedendent.filter(x =>  x != 'A' && x != 'E' && x != 'U' && x != 'I' && x != 'O')
  newArray.unshift(firstElement)
  const toString = newArray.join('')
  return toString;
};

/**
 * This function compares two candidates and returns true if all of the following are true:
 * - the candidates' normalized names are identical
 * - their dates of birth have no more than 10 days difference.
 *
 * @param {Candidate} candidate1
 * @param {Candidate} candidate2
 * @returns true or false
 */
const areSimilarCandidates = (candidate1, candidate2) => {
  const c1Normalize = normalizedName(candidate1.name)
  const c2Normalize = normalizedName(candidate2.name)
  const yearDifference = Math.abs(candidate1.dateOfBirth.getYear() - candidate2.dateOfBirth.getYear())
  const monthDifference = Math.abs(candidate1.dateOfBirth.getMonth() - candidate2.dateOfBirth.getMonth())
  const dateDifference = Math.abs(candidate1.dateOfBirth.getDay() - candidate2.dateOfBirth.getDay())

  if(c1Normalize === c2Normalize  && dateDifference <= 10
    && yearDifference == 0 && monthDifference == 0){
    return true;
  }

  return false;
};

/**
 * Given a candidate, return possible duplicates of this candidate
 * in the given candidateList.
 *
 * @param {Candidate} newCandidate
 * @param {Array<Candidate>} candidateList
 */
const possibleDuplicates = (newCandidate, candidateList) => {
    let similarCandidates = [];
    for (let candidate of candidateList){
      if (areSimilarCandidates(newCandidate, candidate) === 'true'){
        similarCandidates.push(candidate)
      }
    }

  return similarCandidates;
};

/**
 * We want to transform the given candidate list into a dictionary index
 * that enable us to lookup a normalized name and get all the corresponding candidates.
 * A sample output may be:
 * { 'ABRHM' -> [ Candidate {name: 'Abraham', ...},
 *                Candidate {name: 'Abreham', ...},
 *              ],
 *   'BRHN'  -> [ Candidate {name: 'Berhane', ...},
 *                Candidate {name: 'Brhanne', ...},
 *              ]
 * }
 *
 * @param {Array<Candidate>} candidateList
 * @returns
 */
const candidateIndex = (candidateList) => {
  let objCandidate = {}
  for(let candidate in candidateList){
    let norCandidate = normalizedName(candidateList[candidate].name)
    if(norCandidate in objCandidate){
      objCandidate[norCandidate].push(candidateList[candidate])
    }
    else{
        objCandidate[norCandidate] = [candidateList[candidate]]
    }
  }
  return objCandidate
};

/**
 * Find the number of (likely) duplicates in the given list,
 * according to the rules implemented in the areSimilarCandidates function.
 *
 * The candidateList can be a very large list, so the solution should only traverse the list once.
 *
 * @param {Array<Candidate>} candidateList
 *
 * @returns
 */
const duplicateCount = (candidateList) => {
  let duplicateCount = 0;
  const duplicated = [];
  candidateList.forEach((candidate) => {
    if (duplicated.includes(candidate) ||
    possibleDuplicates(candidate, candidateList).length < 2) {
      return;
    }
    duplicated.push(...possibleDuplicates(candidate, candidateList));
    duplicateCount++;
  });
  return duplicateCount;
};

export { normalizedName, areSimilarCandidates, possibleDuplicates, duplicateCount, candidateIndex };
