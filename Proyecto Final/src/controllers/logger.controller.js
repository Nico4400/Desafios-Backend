
export const getLogger = async (req, res) => {
  try {
    req.logger.fatal('This is Fatal');
    req.logger.error('This is Error');
    req.logger.warning('This is Warning');
    req.logger.info('This is Info');
    req.logger.http('This is Http');
    req.logger.debug('This is Debug');
    return res.status(200).send({ satus: "Logger Test Success"});
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: err  });
  }
}