export async function openSort() {
  let sortClose = document.querySelectorAll(".sort");
  let sortOpen = document.getElementsByClassName("sort-btn");
  let hiddenSort = document.getElementsByClassName("hidden-sort");
  if (sortOpen) {
    sortOpen[0].addEventListener("click", () => {
      hiddenSort[0].style.display = "block";
    });
  }
  if (sortClose) {
    sortClose.forEach((btn) =>
      btn.addEventListener(
        "click",
        () => (hiddenSort[0].style.display = "none")
      )
    );
  }
}
openSort();
