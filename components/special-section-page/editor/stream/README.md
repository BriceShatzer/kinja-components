# SpecialSectionStreamEditor ![ready](status-images/ready.svg) ![new](status-images/new.svg)

The SpecialSectionStreamEditor component keeps track of the state of a list of Lunchbox modules.
It appears on the Special Section page in edit mode.
It facilitates the addition, subtraction, and vertical rearrangement of these modules via a toolbar that is rendered alongside each module.
this component could be used in the future on the new version of blog homepages; it is flexible enough to accomodate any new kind of module we'd like to add.

The component is stateful only in that it keeps track of the selected module (on which an extra toolbar is displayed). Otherwise the component expects the state of the modules in the stream to be stored in a parent component (likely the SpecialSectionEditor).