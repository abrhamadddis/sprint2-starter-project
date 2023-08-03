// eslint-disable-next-line no-unused-vars
import { Candidate, Job } from '../common/model.js';

/**
 * Part 3: Job matching
 * ------------------------------------------
 *
 */

/**
 * This function returns true only if the candidateSkill is a match
 * for the job skill:
 * - the names are identical, regardless of case
 * - the candidate's skill level is higher or equal to the job skill level
 *
 *
 * @param {Skill} candidateSkill
 * @param {Skill} jobSkill
 */
const skillsMatch = (candidateSkill, jobSkill) => {
  if(candidateSkill.name.toLowerCase() === jobSkill.name.toLowerCase() && candidateSkill.level >= jobSkill.level){
    return true;
}
  return false;
};

/**
 * Returns true if the candidate meets the gender requirements
 * of the given job. If the job has no gender requirements, all candidates
 * are suitable.
 *
 * @param {Candidate} candidate
 * @param {Job} job
 */
const suitableGender = (candidate, job) => {
  if(job.requiredGender == undefined){
    return true;
  }
  else if(candidate.gender === job.requiredGender){
    return true;
  }

  return false;
};


/**
 *
 * This function returns a number between 0 and 100 indicating the suitability
 * of the candidate for the given job. Rules are as follows:
 * - 20% of the score is allocated for gender suitablity.
 * - 80% is reserved for matching skills. A candidate who has all the skills required by the job will
 * get 80%.
 * The result will be rounded to the closest whole number.
 *
 * @param {String} name
 * @returns String
 */
const suitabilityScore = (candidate, job) => {
  let count1 = 0;
  let count2 = 0;
  if(candidate.gender == job.requiredGender || job.requiredGender == undefined){
      count1 += 20;
  }
  for(let skill of candidate.skills){
      for(let jobskill of job.requiredSkills){
          if(skill.name === jobskill.name){
              if(skill.level >= jobskill.level){
                  count2++
              }
          }
      }
  }
  console.log(count2)
  let joblength = job.requiredSkills.length
  let candidateSuitability = Math.round((count2/joblength) * 80) + count1

  return candidateSuitability;


};

/**
 * The 'hotness' of a candidate is defined by the number of jobs
 * for which their suitability score is greater than 80.
 * This function returns the highest 'hotness' score from the candidates list
 * and the provided jobs list.
 *
 * @param {Array<Candidate>} candidates
 * @param {Array<Job>} jobs
 * @returns number
 */
const hottestCandidate = (candidates, jobs) => {
  let hotCandidate = 0
  for(let candidate of candidates){
    for(let job of jobs){
      if(suitabilityScore(candidate, job) > 80){
        hotCandidate += 1
      }
    }
  }

  return hotCandidate;
};

export { skillsMatch, suitableGender, suitabilityScore, hottestCandidate };
