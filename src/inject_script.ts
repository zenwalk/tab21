(() => {
  //   console.log("from file");
  //   Array.from(document.querySelectorAll(".delfav")).map(el =>
  //     (el as HTMLElement).click()
  //   );

  // alert('from file')
  Array.from(document.querySelectorAll(".WB_empty"))
    .filter(el => document.querySelectorAll(".delfav").length > 0)
    .map(i => i.getAttribute("mid"))
    .forEach(i => console.log(i));
})();
