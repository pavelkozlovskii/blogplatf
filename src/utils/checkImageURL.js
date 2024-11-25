async function checkImageURL(url) {
  try {
    const res = await fetch(url);

    if (res.ok) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export default checkImageURL;
