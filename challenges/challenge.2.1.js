/* eslint-disable no-unused-vars */
import { Job, Candidate, Skill } from '../common/model.js';

/**
 * Part 1: Basic utility functions.
 *
 * The challenge is to create optimal solutions for implementing some of the
 * common utility functions that we will need to build our ATS solution.
 *
 *
 */

/**
 * Filter the given jobs list and return only jobs that start between the given
 * start and end dates.
 *
 * @param {Array<Job>} jobs
 * @param {Date} startDate
 * @param {Date} endDate
 */
const filterByDate = (jobs, startDate, endDate) => {
  const filterdJobs = [];
  for (const job of jobs) {
    if (job.startDate >= startDate && job.startDate <= endDate) {
      filterdJobs.push(job);
    }
  }

  return filterdJobs;
};

/**
 * Filter the given candidates list and return only candidates that are born
 * on or after the given date.
 *
 * @param {Array<Candidate>} candidates
 * @param {Date} date
 */
const filterByBornAfter = (candidates, date) => {
  const filterdCandidates = [];
  for (const candidate of candidates) {
    if (candidate.dateOfBirth >= date) {
      filterdCandidates.push(candidate);
    }
  }

  return filterdCandidates;
};

/**
 * Sort the given candidate list, so that candidates with most skills,
 * regardless of the levels, are at the beginning.
 *
 * @param {*} candidateList
 * @returns
 */
const orderBySkills = (candidateList) => {
  candidateList = candidateList.sort(
    (a, b) => b.skills.length - a.skills.length
  );
  return candidateList;
};

/**
 * Sort the given candidate list, so that candidates with more valuable skills,
 * are at the beginning.
 * Each skill will be weighed as follows: Expert levels count as 10, Advanced levels count as 5, Beginner levels count as 1
 *
 * @param {Array<Candidate>} candidateList
 * @returns
 */
const orderByWeightedSkills = (candidateList) => {
  candidateList.forEach(candidate => {
    candidate.totalPoints = candidate.skills.reduce((sum, skill) => {
      if (skill.level === 2) {
        return sum + 10;
      } else if (skill.level === 1) {
        return sum + 5;
      } else {
        return sum + 1;
      }
    }, 0);
  });
  return candidateList.sort((a, b) => b.totalPoints - a.totalPoints);
};

/**
 * Return the ratio of female/male candidates in the list
 * @param {Array<Candidate>} candidateList
 * @returns a floating point number indicating the ratio
 */
const genderRatio = (candidateList) => {
  let male = 0;
  let female = 0;
  let ratio = 0;
  for (const candidate of candidateList) {
    if (candidate.gender === 'M') {
      male++;
    } else {
      female++;
    }
  }
  ratio = female / male;
  return ratio;
};

/**
 * Return the month with the highest number of jobs starting,
 * indicated by the startDate property of each Job.
 * @param {Array<Job>} jobs
 * @returns number (0-11)
 */
const busiestMonth = (jobs) => {
  const allmonth = [];
  const countMonth = [];
  const checkedMonth = [];

  for (const job of jobs) {
    allmonth.push(job.startDate.getMonth());
  }
  for (const element of allmonth) {
    if (!checkedMonth.includes(element)) {
      let count = 0;
      for (const index of allmonth) {
        if (index === element) {
          count++;
        }
      }
      countMonth.push({ element, count });
      checkedMonth.push(element);
    }
  }
  let maxCount = 0;
  for (const obj of countMonth) {
    if (obj.count > maxCount) {
      maxCount = obj.count;
    }
  }
  const busyMonth = [];
  for (const obj of countMonth) {
    if (obj.count === maxCount) {
      busyMonth.push(obj.element);
    }
  }
  return busyMonth;
};

/**
 * Return the skill name that is required the most in the given list of Jobs,
 * indicated by the requiredSkills property of each Job.
 *
 * @param {Array<Job>} jobs
 */
const mostInDemandSkill = (jobs) => {
  const allSkill = [];
  const countedElement = [];
  const checkedElement = [];

  for (const job of jobs) {
    for (const skill of job.requiredSkills) {
      allSkill.push(skill.name);
    }
  }
  for (const element of allSkill) {
    if (checkedElement.includes(element) === false) {
      let count = 0;
      for (const index of allSkill) {
        if (index.toLowerCase() === element.toLowerCase()) {
          count++;
        }
      }
      countedElement.push({ element, count });
      checkedElement.push(element);
    }
  }

  let maxCount = 0;
  for (const obj of countedElement) {
    if (obj.count > maxCount) {
      maxCount = obj.count;
    }
  }
  const mostDemand = [];
  for (const obj of countedElement) {
    if (obj.count === maxCount) {
      mostDemand.push(obj.element);
    }
  }
  return mostDemand;
};

export {
  filterByDate,
  filterByBornAfter,
  orderBySkills,
  orderByWeightedSkills,
  genderRatio,
  busiestMonth,
  mostInDemandSkill
};
