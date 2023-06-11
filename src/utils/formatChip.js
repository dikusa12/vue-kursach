export const formatChip = (course) => {
  switch (course.language) {
    case 'html':
      return 'HTML';
    case 'js':
      return 'JavaScript';
    case 'react':
      return 'React';
    case 'css':
      return 'CSS';
  }
};