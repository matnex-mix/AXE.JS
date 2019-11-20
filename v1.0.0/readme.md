# AXEJS
AXE.JS or $XE is a lightweight javascript for creating, controlling and managing web animations. AXE uses a USER_DEFINED system thus making it easily customizeable. AXE gives rise to making a site lively while writings few lines of text/syntax. Although we are not perfect, we ensure you an everlasting experience using AXE.

### When to use AXE:
- Need to do animations with less lines of js
- Need to do animations with more of javascript
- Looking to use animations from a collection of over 50 anims
- Looking for a comprehensive animation library/framework

## Installation

### Through NPM:
```npm install axe-light```

### Through CND:
Add this between the `<head>` tags
```
<script src="http://code.mjmltd.com.ng/axe/axe-VERSION-NUMBER-/-TYPE-.js"></script>
```
The -TYPE- can be (axe-html, axe-easy or axe).

Check if installed, place before `</body>`

```
<div id="axe-test">Testing AXE</div>
<script>
$axe = $XE.$({
    t: 0.5,
    n: "axe-test",
    a: "AT0 o:0; AT0.5 o:1;"
});
$axe.apply("#axe-test");
</script>
```