// Version - 2.0
// http://jqueryui.com/easing/
(function ($) {
    // Globals
    var DefaultClass = 'DefaultMetroTiles';
    var SmallestTileSize = 100;
    var PointPosition = {
        Left: 0,
        Right: 1
    };
    // Transition specific globals
    var NoOfTransitions = 7;
    var ScaleFactor = 0.2;
    // Loading Variable
    var MainLoading = undefined;
    // Default Functions
    function ConvertTrueFalse(Input) {
        if (Input == 'true') {
            return true;
        } else {
            return false;
        }
    }
    function GetDefaultValue(Input, Default, Type) {
        switch (Type) {
            case 'String':
                return ((typeof Input !== 'undefined') ? Input : Default);
                break;
            case 'Integer':
                return ((typeof Input !== 'undefined') ? ((isNaN(parseInt(Input, 10)) == false) ? parseInt(Input, 10) : Default) : Default);
                break;
            case 'Boolean':
                return ((typeof Input !== 'undefined') ? ConvertTrueFalse(Input) : Default);
                break;
        }
    }
    function GetSizeValue(Type, Spacing) {
        switch (Type) {
            case 'Large':
                return SmallestTileSize * 3 + Spacing * 2;
                break;
            case 'Medium':
                return SmallestTileSize * 2 + Spacing * 1;
                break;
            case 'Small':
                return SmallestTileSize * 1;
                break;
        }
    }
    function GetValueByBoolean(Boolean, TrueValue, FalseValue) {
        if (Boolean == true) {
            return TrueValue;
        } else {
            return FalseValue;
        }
    }
    function GetTransitionName(TransitionID, PrimaryType, SecondaryType) {
        var TransitionName = undefined;
        switch (TransitionID) {
            case 1:
                TransitionName = "Fade_";
                break;
            case 2:
                TransitionName = "Fade_=Top";
                break;
            case 3:
                TransitionName = "Fade_=Bottom";
                break;
            case 4:
                TransitionName = "Fade_=Left";
                break;
            case 5:
                TransitionName = "Fade_=Right";
                break;
            case 6:
                TransitionName = "Fade_ScaleDown=Left";
                break;
            case 7:
                TransitionName = "Fade_ScaleUp=Left";
                break;
            case 8:
                TransitionName = "Fade_ScaleDown=Right";
                break;
            case 9:
                TransitionName = "Fade_ScaleUp=Right";
                break;
        }
        if (typeof TransitionName !== 'undefined') {
            TransitionName = TransitionName.replace("_", PrimaryType);
            TransitionName = TransitionName.replace("=", SecondaryType);
        }
        return TransitionName;
    }
    function GetTitlesArray(Titles) {
        if (Titles != '') {
            var TitlesArray = Titles.split(',');
            if (TitlesArray.length != 0) {
                return TitlesArray;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    // Browser detection
    // This code has been taken from here - http://stackoverflow.com/questions/13478303
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },
        dataBrowser: [
            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
            { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
        ]

    };
    // jQuery plugins
    $.fn.GetFrameSettings = function (ExtendOptions) {
        var Element = $(this);
        var Settings = $.extend({
            'top': GetDefaultValue(Element.attr('top'), 0, 'Integer'),
            'left': GetDefaultValue(Element.attr('left'), 0, 'Integer'),
            'width': GetDefaultValue(Element.attr('width'), window.innerWidth, 'Integer'),
            'height': GetDefaultValue(Element.attr('height'), window.innerHeight, 'Integer'),
            'tilesclass': GetDefaultValue(Element.attr('tilesclass'), DefaultClass, 'String'),
            'autoenter': GetDefaultValue(Element.attr('autoenter'), false, 'Boolean'),
            'spacing': GetDefaultValue(Element.attr('spacing'), 25, 'Integer'),
            'titles': GetTitlesArray(GetDefaultValue(Element.attr('titles'), '', 'String')),
            'backcolor': GetDefaultValue(Element.attr('backcolor'), '#222222', 'String'),
            'forecolor': GetDefaultValue(Element.attr('forecolor'), '#dddddd', 'String'),
            'titlefontsize': GetDefaultValue(Element.attr('titlefontsize'), 16, 'Integer')
        }, ExtendOptions);
        return Settings;
    };
    $.fn.GetSettings = function (ExtendOptions) {
        var Element = $(this);
        var Settings = $.extend({
            'size': GetDefaultValue(Element.attr('size'), 'Medium', 'String'),
            'top': GetDefaultValue(Element.attr('top'), 0, 'Integer'),
            'left': GetDefaultValue(Element.attr('left'), 0, 'Integer'),
            'width': GetDefaultValue(Element.attr('width'), undefined, 'Integer'),
            'height': GetDefaultValue(Element.attr('height'), undefined, 'Integer'),
            'drawborder': GetDefaultValue(Element.attr('drawborder'), false, 'Boolean'),
            'borderwidth': GetDefaultValue(Element.attr('borderwidth'), 5, 'Integer'),
            'bordercolor': GetDefaultValue(Element.attr('bordercolor'), '#333333', 'String'),

            'type': GetDefaultValue(Element.attr('type'), 'Text', 'String'),
            'backcolor': GetDefaultValue(Element.attr('backcolor'), '#222222', 'String'),
            'forecolor': GetDefaultValue(Element.attr('forecolor'), '#dddddd', 'String'),
            'backimage': GetDefaultValue(Element.attr('backimage'), undefined, 'String'),
            'backimageposition': GetDefaultValue(Element.attr('backimageposition'), undefined, 'String'),
            'backimagesize': GetDefaultValue(Element.attr('backimagesize'), 'initial', 'String'),
            'backimagerepeat': GetDefaultValue(Element.attr('backimagerepeat'), 'initial', 'String'),
            'padding': GetDefaultValue(Element.attr('padding'), 10, 'Integer'),
            'entertransition': GetDefaultValue(Element.attr('entertransition'), 'Random', 'String'),
            'exittransition': GetDefaultValue(Element.attr('exittransition'), 'Random', 'String'),
            'forcetransition': GetDefaultValue(Element.attr('forcetransition'), true, 'Boolean'),
            'duration': GetDefaultValue(Element.attr('duration'), 500, 'Integer'),
            'easing': GetDefaultValue(Element.attr('easing'), 'easeOutQuint', 'String'),

            'hoverenabled': GetDefaultValue(Element.attr('hoverenabled'), false, 'Boolean'),
            'hovertype': GetDefaultValue(Element.attr('hovertype'), 'Text', 'String'),
            'hoverbackcolor': GetDefaultValue(Element.attr('hoverbackcolor'), '#222222', 'String'),
            'hoverforecolor': GetDefaultValue(Element.attr('hoverforecolor'), '#dddddd', 'String'),
            'hoverbackimage': GetDefaultValue(Element.attr('hoverbackimage'), undefined, 'String'),
            'hoverpadding': GetDefaultValue(Element.attr('hoverpadding'), 10, 'Integer'),
            'hoverentertransition': GetDefaultValue(Element.attr('hoverentertransition'), 'Random', 'String'),
            'hoverexittransition': GetDefaultValue(Element.attr('hoverexittransition'), 'Random', 'String'),
            'hoverforcetransition': GetDefaultValue(Element.attr('hoverforcetransition'), true, 'Boolean'),
            'hoverduration': GetDefaultValue(Element.attr('hoverduration'), 500, 'Integer'),
            'hovereasing': GetDefaultValue(Element.attr('hovereasing'), 'easeOutQuint', 'String'),

            'expandenabled': GetDefaultValue(Element.attr('expandenabled'), true, 'Boolean'),
            'expandduration': GetDefaultValue(Element.attr('expandduration'), 1250, 'Integer'),
            'expandeasing': GetDefaultValue(Element.attr('expandeasing'), 'easeOutQuint', 'String'),
            'expandcontententertransition': GetDefaultValue(Element.attr('expandcontententertransition'), 'Random', 'String'),
            'expandcontentexittransition': GetDefaultValue(Element.attr('expandcontentexittransition'), 'Random', 'String'),
            'expandcontentduration': GetDefaultValue(Element.attr('expandcontentduration'), 1250, 'Integer'),
            'expandcontenteasing': GetDefaultValue(Element.attr('expandcontenteasing'), 'easeOutQuint', 'String')

        }, ExtendOptions);
        return Settings;
    };
    $.fn.EnterTile = function (DefaultOptions, After) {
        var Element = $(this);
        // Getting settings from the element.
        var Settings = Element.GetSettings();
        Settings = $.extend(Settings, DefaultOptions);
        // Processing transition name.
        var EnterTransition = Settings.entertransition;
        if (isNaN(parseInt(EnterTransition, 10)) == false) {
            EnterTransition = GetTransitionName(EnterTransition, 'In', 'From');
        }
        if (EnterTransition == 'Random') {
            var Random = Math.floor((Math.random() * NoOfTransitions) + 1);
            EnterTransition = GetTransitionName(Random, 'In', 'From');
        }
        // Element styles previous animation and after animation.
        var Top = Settings.top;
        var Left = Settings.left;
        var Width = Settings.width;
        var Height = Settings.height;
        if (((typeof Width === 'undefined') == true) || ((typeof Height === 'undefined') == true)) {
            Width = GetSizeValue(Settings.size);
            Height = GetSizeValue(Settings.size);
        }
        var Perspective = 200;
        var BeforeAnimationStyle = {
            'opacity': '0.0',
            'top': Top + 'px',
            'left': Left + 'px',
            'width': Width + 'px',
            'height': Height + 'px',
            '-webkit-transform': 'scale(1.0)',
            '-moz-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-o-transform': 'scale(1.0)',
            'transform': 'scale(1.0)',
            'scale': '0.0',
            'rotate': '0',
            'display': 'block'
        };
        var AfterAnimationStyle = {
            'opacity': '1.0',
            'top': Top + 'px',
            'left': Left + 'px',
            'width': Width + 'px',
            'height': Height + 'px',
            '-webkit-transform': 'scale(1.0)',
            '-moz-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-o-transform': 'scale(1.0)',
            'transform': 'scale(1.0)',
            'scale': '0.0',
            'rotate': '0',
            'display': 'block'
        };
        var AnimationStyle = {};
        var AnimationOptions = {
            'duration': Settings.duration,
            'easing': Settings.easing,
            'step': undefined,
            'complete': function () {
                Element.stop(true).css(AfterAnimationStyle).stop().after(function () {
                    if (Settings.forcetransition == true) {
                        Element.show();
                    }
                    if (typeof After !== 'undefined') {
                        After();
                    }
                });
            }
        };
        switch (EnterTransition) {
            case 'FadeIn':
                AnimationStyle = {
                    'opacity': '1.0'
                };
                break;
            case 'FadeInFromTop':
                BeforeAnimationStyle.top = Top - Height / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'top': Top + 'px'
                };
                break;
            case 'FadeInFromBottom':
                BeforeAnimationStyle.top = Top + Height / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'top': Top + 'px'
                };
                break;
            case 'FadeInFromLeft':
                BeforeAnimationStyle.left = Left - Width / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'left': Left + 'px'
                };
                break;
            case 'FadeInFromRight':
                BeforeAnimationStyle.left = Left + Width / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'left': Left + 'px'
                };
                break;
            case 'FadeInScaleDownFromLeft':
                BeforeAnimationStyle.left = Left - Width / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'left': Left + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            '-moz-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            '-ms-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            '-o-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            'transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')'
                        });
                    }
                };
                break;
            case 'FadeInScaleUpFromLeft':
                BeforeAnimationStyle.left = Left - Width / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'left': Left + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            '-moz-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            '-ms-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            '-o-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            'transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')'
                        });
                    }
                };
                break;
            case 'FadeInScaleDownFromRight':
                BeforeAnimationStyle.left = Left + Width / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'left': Left + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            '-moz-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            '-ms-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            '-o-transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')',
                            'transform': 'scale(' + ((1.0 + ScaleFactor) - CurrentValue) + ')'
                        });
                    }
                };
                break;
            case 'FadeInScaleUpFromRight':
                BeforeAnimationStyle.left = Left + Width / 2 + 'px';
                AnimationStyle = {
                    'opacity': '1.0',
                    'left': Left + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            '-moz-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            '-ms-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            '-o-transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')',
                            'transform': 'scale(' + ((1.0 - ScaleFactor) + CurrentValue) + ')'
                        });
                    }
                };
                break;
        }
        Element.stop(true).css(BeforeAnimationStyle).show().stop().animate(AnimationStyle, AnimationOptions);
    };
    $.fn.ExitTile = function (DefaultOptions, After) {
        var Element = $(this);
        // Getting settings from the element.
        var Settings = Element.GetSettings();
        Settings = $.extend(Settings, DefaultOptions);
        // Processing transition name.
        var ExitTransition = Settings.exittransition;
        if (isNaN(parseInt(ExitTransition, 10)) == false) {
            ExitTransition = GetTransitionName(ExitTransition, 'Out', 'To');
        }
        if (ExitTransition == 'Random') {
            var Random = Math.floor((Math.random() * NoOfTransitions) + 1);
            ExitTransition = GetTransitionName(Random, 'Out', 'To');
        }
        // Element styles previous animation and after animation.
        var Top = Settings.top;
        var Left = Settings.left;
        var Width = Settings.width;
        var Height = Settings.height;
        if (((typeof Width === 'undefined') == true) || ((typeof Height === 'undefined') == true)) {
            Width = GetSizeValue(Settings.size);
            Height = GetSizeValue(Settings.size);
        }
        var Perspective = 200;
        var BeforeAnimationStyle = {
            'opacity': '1.0',
            'top': Top + 'px',
            'left': Left + 'px',
            'width': Width + 'px',
            'height': Height + 'px',
            '-webkit-transform': 'scale(1.0)',
            '-moz-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-o-transform': 'scale(1.0)',
            'transform': 'scale(1.0)',
            'scale': '0.0',
            'rotate': '0',
            'display': 'block'
        };
        var AfterAnimationStyle = {
            'opacity': '0.0',
            'top': Top + 'px',
            'left': Left + 'px',
            'width': Width + 'px',
            'height': Height + 'px',
            '-webkit-transform': 'scale(1.0)',
            '-moz-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-o-transform': 'scale(1.0)',
            'transform': 'scale(1.0)',
            'scale': '0.0',
            'rotate': '0',
            'display': 'block'
        };
        var AnimationStyle = {};
        var AnimationOptions = {
            'duration': Settings.duration,
            'easing': Settings.easing,
            'step': undefined,
            'complete': function () {
                Element.stop(true).css(AfterAnimationStyle).stop().after(function () {
                    if (Settings.forcetransition == true) {
                        Element.hide();
                    }
                    if (typeof After !== 'undefined') {
                        After();
                    }
                });
            }
        };
        switch (ExitTransition) {
            case 'FadeOut':
                AnimationStyle = {
                    'opacity': '0.0'
                };
                break;
            case 'FadeOutToTop':
                AnimationStyle = {
                    'opacity': '0.0',
                    'top': Top - Height / 2 + 'px'
                };
                break;
            case 'FadeOutToBottom':
                AnimationStyle = {
                    'opacity': '0.0',
                    'top': Top + Height / 2 + 'px'
                };
                break;
            case 'FadeOutToLeft':
                AnimationStyle = {
                    'opacity': '0.0',
                    'left': Left - Width / 2 + 'px'
                };
                break;
            case 'FadeOutToRight':
                AnimationStyle = {
                    'opacity': '0.0',
                    'left': Left + Width / 2 + 'px'
                };
                break;
            case 'FadeOutScaleDownToLeft':
                AnimationStyle = {
                    'opacity': '0.0',
                    'left': Left - Width / 2 + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            '-moz-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            '-ms-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            '-o-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            'transform': 'scale(' + (1.0 - CurrentValue) + ')'
                        });
                    }
                };
                break;
            case 'FadeOutScaleUpToLeft':
                AnimationStyle = {
                    'opacity': '0.0',
                    'left': Left - Width / 2 + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            '-moz-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            '-ms-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            '-o-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            'transform': 'scale(' + (1.0 + CurrentValue) + ')'
                        });
                    }
                };
                break;
            case 'FadeOutScaleDownToRight':
                AnimationStyle = {
                    'opacity': '0.0',
                    'left': Left + Width / 2 + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            '-moz-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            '-ms-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            '-o-transform': 'scale(' + (1.0 - CurrentValue) + ')',
                            'transform': 'scale(' + (1.0 - CurrentValue) + ')'
                        });
                    }
                };
                break;
            case 'FadeOutScaleUpToRight':
                AnimationStyle = {
                    'opacity': '0.0',
                    'left': Left + Width / 2 + 'px',
                    'scale': ScaleFactor
                };
                AnimationOptions.step = function (CurrentValue, CurrentProperty) {
                    if (CurrentProperty.prop == 'scale') {
                        $(this).css({
                            '-webkit-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            '-moz-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            '-ms-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            '-o-transform': 'scale(' + (1.0 + CurrentValue) + ')',
                            'transform': 'scale(' + (1.0 + CurrentValue) + ')'
                        });
                    }
                };
                break;
        }
        Element.stop(true).css(BeforeAnimationStyle).show().stop().animate(AnimationStyle, AnimationOptions);
    };
    $.fn.CreateTileLayout = function (PrimaryType, SecondaryType) {
        var Element = $(this);
        // Getting settings from the element.
        var Settings = Element.GetSettings();
        var LayoutClass = SecondaryType + 'Frame';
        // Applying styles to the layout element.
        var Width = parseInt(Settings.width - Settings.padding * 2 - Settings.borderwidth * 2, 10);
        var Height = parseInt(Settings.height - Settings.padding * 2 - Settings.borderwidth * 2, 10);
        Element.append('<div class="' + LayoutClass + '"></div>');
        var LayoutFrame = Element.find('div.' + LayoutClass);
        LayoutFrame.css({
            'background-color': Settings.backcolor,
            'width': Settings.width + 'px',
            'height': Settings.height + 'px',
            'display': 'block',
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'overflow': 'hidden'
        });
        switch (SecondaryType) {
            case 'Base':
                LayoutFrame.css({
                    'background-image': ((typeof Settings.backimage !== 'undefined') ? 'url("' + Settings.backimage + '")' : 'none'),
                    'background-position': Settings.backimageposition,
                    'background-size': Settings.backimagesize,
                    'background-repeat': Settings.backimagerepeat
                });
                break;
            case 'Hover':
                LayoutFrame.css({
                    'background-image': ((typeof Settings.hoverbackimage !== 'undefined') ? 'url("' + Settings.hoverbackimage + '")' : 'none'),
                    'background-position': Settings.hoverbackimageposition,
                    'background-size': Settings.hoverbackimagesize,
                    'background-repeat': Settings.hoverbackimagerepeat
                });
                break;
        }
        // Generating layout for specific layout type.
        switch (PrimaryType) {
            case 'Text':
                var Title = undefined;
                var Content = undefined;
                switch (SecondaryType) {
                    case 'Base':
                        Title = Element.find('contenttitle').html();
                        Content = Element.find('content').html();
                        break;
                    case 'Hover':
                        Title = Element.find('hovercontenttitle').html();
                        Content = Element.find('hovercontent').html();
                        break;
                }
                LayoutFrame.append('<table class="ContentFrame" border="0" cellpadding="0" cellspacing="0">\
                                        <tbody>\
                                            <tr height="100%">\
                                                <td class="Title">' + ((typeof Title !== 'undefined') ? Title : '') + '</td>\
                                            </tr>\
                                            <tr>\
                                                <td class="Content">' + ((typeof Content !== 'undefined') ? Content : '') + '</td>\
                                            </tr>\
                                        </tbody>\
                                    </table>');
                LayoutFrame.find('table.ContentFrame').css({
                    'width': Width + 'px',
                    'height': Height + 'px',
                    'position': 'absolute',
                    'top': Settings.padding + 'px',
                    'left': Settings.padding + 'px'
                });
                LayoutFrame.find('td.Title').css({
                    'color': Settings.forecolor,
                    'padding': '0px 0px ' + Settings.padding / 2 + 'px 0px',
                    'font-size': '20px',
                    'font-weight': 'bold',
                    'text-align': 'left',
                    'vertical-align': 'bottom'
                });
                LayoutFrame.find('td.Content').css({
                    'color': Settings.forecolor,
                    'padding': '0px',
                    'font-size': '12px',
                    'font-weight': 'regular',
                    'text-align': 'left',
                    'vertical-align': 'bottom'
                });
                if (Settings.size == 'Small') {
                    LayoutFrame.find('td.Content').hide();
                }
                break;
            case 'Icon':
                var Title = undefined;
                var Icon = undefined;
                switch (SecondaryType) {
                    case 'Base':
                        Title = Element.find('contenttitle').html();
                        Icon = Element.find('contenticon').html();
                        break;
                    case 'Hover':
                        Title = Element.find('hovercontenttitle').html();
                        Icon = Element.find('hovercontenticon').html();
                        break;
                }
                if (Settings.size == 'Small') {
                    Title = '';
                }
                LayoutFrame.append('<table class="ContentFrame" border="0" cellpadding="0" cellspacing="0">\
                                        <tbody>\
                                            <tr height="100%">\
                                                <td class="Title">' + ((typeof Title !== 'undefined') ? Title : '') + '</td>\
                                            </tr>\
                                        </tbody>\
                                    </table>');
                LayoutFrame.find('table.ContentFrame').css({
                    'width': Width + 'px',
                    'height': Height + 'px',
                    'position': 'absolute',
                    'top': Settings.padding + 'px',
                    'left': Settings.padding + 'px',
                    'background-image': 'url("' + Icon + '")',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat'
                });
                LayoutFrame.find('td.Title').css({
                    'color': Settings.forecolor,
                    'padding': '0px 0px ' + Settings.padding / 2 + 'px 0px',
                    'font-size': '20px',
                    'font-weight': 'bold',
                    'text-align': 'left',
                    'vertical-align': 'bottom'
                });
                break;
        }
        LayoutFrame.attr(Element.GetSettings({
            'width': Settings.width,
            'height': Settings.height,
            'top': 0,
            'left': 0
        }));
        return LayoutFrame;
    };
    $.fn.CreateLoading = function (DefaultOptions) {
        var Element = $(this);
        var Settings = $.extend({}, {
            'top': 0,
            'left': 0,
            'size': 5,
            'numberofblocks': 5,
            'color': '#eeeeee',
            'width': SmallestTileSize,
            'duration': 500,
            'easingin': 'easeOutQuad',
            'easinout': 'easeInQuad',
            'rounded': true
        }, DefaultOptions);
        Element.append('<div class="LoadingFrame">\
                        </div>');
        var LoadingFrame = Element.find('div.LoadingFrame');
        var LoadingBlockArray = new Array;
        for (i = 1; i <= Settings.numberofblocks; i++) {
            LoadingFrame.append('<div class="LoadingBlock" id="LoadingBlock-' + i + '"></div>');
            LoadingBlockArray.push(LoadingFrame.find('#LoadingBlock-' + i));
            LoadingBlockArray[i - 1].css({
                'background-color': Settings.color,
                'width': Settings.size + 'px',
                'height': Settings.size + 'px',
                'position': 'absolute',
                'opacity': '0.0',
                'top': '0px',
                'left': -Settings.size + 'px',
                '-webkit-border-radius': Settings.size * 8 + 'px',
                '-moz-border-radius': Settings.size * 8 + 'px',
                '-ms-border-radius': Settings.size * 8 + 'px',
                '-o-border-radius': Settings.size * 8 + 'px',
                'border-radius': Settings.size * 8 + 'px',
                '-webkit-background-clip': 'padding-box',
                '-moz-background-clip': 'padding-box',
                '-ms-background-clip': 'padding-box',
                '-o-background-clip': 'padding-box',
                'background-clip': 'padding-box'
            });
        }
        LoadingFrame.css({
            'position': 'absolute',
            'top': Settings.top + 'px',
            'left': Settings.left + 'px',
            'width': Settings.width + 'px',
            'height': Settings.size + 'px',
            'overflow': 'hidden'
        }).after(function () {
            var Center = Settings.width / 2;
            var CurrentLeft = 0;
            var CenterBlock = 0;
            if (Settings.numberofblocks % 2 == 0) {
                CenterBlock = Settings.numberofblocks / 2;
            } else {
                CenterBlock = (Settings.numberofblocks + 1) / 2;
            }
            MainLoading = setInterval(function () {
                var Count = 1;
                var Loading = setInterval(function () {
                    if (Count <= Settings.numberofblocks) {
                        if (CenterBlock == Count) {
                            CurrentLeft = Center;
                        } else {
                            CurrentLeft = Center + Settings.size * 2 * (CenterBlock - Count);
                        }
                        CurrentLeft -= Settings.size * 4;
                        LoadingBlockArray[Count - 1].animate({
                            'left': CurrentLeft + 'px',
                            'opacity': '1.0'
                        }, Settings.duration, Settings.easingin, function () {
                            $(this).animate({
                                'left': $(this).position().left + Settings.size * 6 + 'px'
                            }, Settings.duration * 2, 'linear', function () {
                                $(this).animate({
                                    'left': Settings.width + Settings.size + 'px',
                                    'opacity': '0.0'
                                }, Settings.duration, Settings.easingout, function () {
                                    $(this).css({
                                        'left': -Settings.size + 'px'
                                    });
                                });
                            });
                        });
                        Count++;
                    } else {
                        setTimeout(function () {
                            clearInterval(Loading);
                        }, Settings.duration * 9 / 2);
                    }
                }, Settings.duration / 2);
            }, Settings.duration * 6);
        });
        return LoadingFrame;
    };
    $.fn.StopLoading = function () {
        var Element = $(this);
        clearInterval(MainLoading);
        Element.animate({
            'opacity': '0.0'
        }, 250, 'linear', function () {
            Element.remove();
        });
    };
    $.fn.ExpandTile = function (DefaultOptions, BaseLayoutFrame, HoverLayoutFrame, HoverTransitionOptions, BaseElement, Event) {
        var Element = $(this);
        // Getting settings from the element.
        var Settings = Element.GetSettings();
        Settings = $.extend(Settings, DefaultOptions);
        var BaseSettings = BaseElement.GetFrameSettings();
        // Declaring required variables.
        var Top = Settings.top;
        var Left = Settings.left;
        var Width = Settings.width;
        var Height = Settings.height;
        if (((typeof Width === 'undefined') == true) || ((typeof Height === 'undefined') == true)) {
            Width = GetSizeValue(Settings.size);
            Height = GetSizeValue(Settings.size);
        }
        var ExpandTop = -Settings.spacing - BaseSettings.top + Settings.borderwidth + $(window).scrollTop() - 1;
        // Fixing ExpandTop for Firefox browser.
        if (BrowserDetect.browser == 'Firefox') {
            ExpandTop -= 2;
        }
        var ExpandLeft = -Element.offset().left + Settings.left + $(window).scrollLeft();
        var Perspective = 800;
        var ScaleValue = 0;
        var TitleElement = BaseElement.find('table.MainFrame tbody tr.Title td div.TitleBlock');
        var BeforeAnimationStyle = {
            'opacity': '1.0',
            'top': Top + 'px',
            'left': Left + 'px',
            'width': Width + 'px',
            'height': Height + 'px',
            '-webkit-transform': 'scale(1.0)',
            '-moz-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-o-transform': 'scale(1.0)',
            'transform': 'scale(1.0)',
            '-webkit-perspective': Perspective + 'px',
            '-moz-perspective': Perspective + 'px',
            '-o-perspective': Perspective + 'px',
            'perspective': Perspective + 'px',
            '-webkit-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-moz-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-ms-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-o-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            'transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-webkit-transform-style': 'preserve-3d',
            '-moz-transform-style': 'preserve-3d',
            '-o-transform-style': 'preserve-3d',
            'transform-style': 'preserve-3d',
            'scale': '0.0',
            'rotate': '0',
            'display': 'block',
            'z-index': 99
        };
        var AfterAnimationStyle = {
            'opacity': '1.0',
            'top': 0 + 'px',
            'left': 0 + 'px',
            'width': BaseSettings.width + 'px',
            'height': BaseSettings.height + 'px',
            '-webkit-transform': 'scale(1.0)',
            '-moz-transform': 'scale(1.0)',
            '-ms-transform': 'scale(1.0)',
            '-o-transform': 'scale(1.0)',
            'transform': 'scale(1.0)',
            '-webkit-perspective': Perspective + 'px',
            '-moz-perspective': Perspective + 'px',
            '-o-perspective': Perspective + 'px',
            'perspective': Perspective + 'px',
            '-webkit-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-moz-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-ms-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-o-transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            'transform': 'rotateY(0deg) perspective(' + Perspective + 'px)',
            '-webkit-transform-style': 'preserve-3d',
            '-moz-transform-style': 'preserve-3d',
            '-o-transform-style': 'preserve-3d',
            'transform-style': 'preserve-3d',
            'scale': '0.0',
            'rotate': '0',
            'display': 'block',
            'position': 'fixed',
            'z-index': 99
        };
        var AnimationStyle = {
            'width': BaseSettings.width + 'px',
            'height': BaseSettings.height + 'px',
            'top': ExpandTop + 'px',
            'left': ExpandLeft + 'px',
            'rotate': 180
        };
        var AnimationOptions = {
            'duration': Settings.expandduration,
            'easing': Settings.expandeasing,
            'step': function (CurrentValue, CurrentProperty) {
                if (CurrentProperty.prop == 'scale') {
                    ScaleValue = CurrentValue;
                }
                if (CurrentProperty.prop == 'rotate') {
                    BaseLayoutFrame.css({
                        '-webkit-transform': 'rotateY(' + (180 - CurrentValue) + 'deg)',
                        '-moz-transform': 'rotateY(' + (180 - CurrentValue) + 'deg)',
                        '-ms-transform': 'rotateY(' + (180 - CurrentValue) + 'deg)',
                        '-o-transform': 'rotateY(' + (180 - CurrentValue) + 'deg)',
                        'transform': 'rotateY(' + (180 - CurrentValue) + 'deg)'
                    });
                    HoverLayoutFrame.css({
                        '-webkit-transform': 'rotateY(' + (-CurrentValue) + 'deg)',
                        '-moz-transform': 'rotateY(' + (-CurrentValue) + 'deg)',
                        '-ms-transform': 'rotateY(' + (-CurrentValue) + 'deg)',
                        '-o-transform': 'rotateY(' + (-CurrentValue) + 'deg)',
                        'transform': 'rotateY(' + (-CurrentValue) + 'deg)'
                    });
                }
                $(this).css({
                    '-webkit-transform': 'scale(' + (0.9 + ScaleValue) + ')',
                    '-moz-transform': 'scale(' + (0.9 + ScaleValue) + ')',
                    '-ms-transform': 'scale(' + (0.9 + ScaleValue) + ')',
                    '-o-transform': 'scale(' + (0.9 + ScaleValue) + ')',
                    'transform': 'scale(' + (0.9 + ScaleValue) + ')'
                });
            },
            'complete': function () {
                $('body').css({
                    'overflow': 'hidden'
                }).after(function () {
                    Element.stop(true).css(AfterAnimationStyle).stop().show().after(function () {
                        var ExpandableTitle = Element.find('expandcontenttitle').html();
                        var ExpandableContent = Element.find('expandcontent').html();
                        var ExpandableURL = Element.find('expandurl').html();
                        Element.append('<div class="ExpandableFrame"></div>');
                        var ExpandableFrame = Element.find('div.ExpandableFrame');
                        ExpandableFrame.css({
                            'background-color': Settings.backcolor,
                            'width': (BaseSettings.width - Settings.borderwidth * 2) + 'px',
                            'height': (BaseSettings.height - Settings.borderwidth * 2) + 'px',
                            'display': 'block',
                            'position': 'absolute',
                            'top': (BaseSettings.width + 100) + 'px',
                            'left': (BaseSettings.height + 100) + 'px',
                            'overflow': 'hidden',
                            'opacity': '0.0'
                        });
                        ExpandableFrame.append('<table class="ExpandableContentFrame" border="0" cellpadding="0" cellspacing="0">\
                                        <tbody>\
                                            <tr height="1px">\
                                                <td class="ExpandableTitle" width="100%">' + ((typeof ExpandableTitle !== 'undefined') ? ExpandableTitle : '') + '</td>\
                                                <td class="ExpandableClose">\
                                                    <div class="ExpandableCloseButton" align="center">\
                                                        <img src="close_button.png" width="20px" height="20px"/>\
                                                    <div>\
                                                </td>\
                                            </tr>\
                                            <tr height="100%">\
                                                <td class="ExpandableContent" colspan="2"><div class="ExpandableContentBlock"></div></td>\
                                            </tr>\
                                        </tbody>\
                                    </table>');
                        ExpandableFrame.find('table.ExpandableContentFrame').css({
                            'width': (BaseSettings.width - GetValueByBoolean(Settings.drawborder, Settings.borderwidth * 2, 0) - Settings.padding) + 'px',
                            'height': (BaseSettings.height - GetValueByBoolean(Settings.drawborder, Settings.borderwidth * 2, 0) - Settings.padding) + 'px',
                            'position': 'absolute',
                            'top': Settings.padding + 'px',
                            'left': Settings.padding + 'px'
                        });
                        ExpandableFrame.find('td.ExpandableTitle').css({
                            'color': Settings.forecolor,
                            'padding': '0px 0px ' + Settings.padding / 2 + 'px 0px',
                            'font-size': '20px',
                            'font-weight': 'bold',
                            'text-align': 'left',
                            'vertical-align': 'top'
                        });
                        ExpandableFrame.find('td.ExpandableClose').css({
                            'color': Settings.forecolor,
                            'padding': '0px 0px ' + Settings.padding / 2 + 'px 0px',
                            'font-size': '20px',
                            'font-weight': 'bold',
                            'text-align': 'left',
                            'vertical-align': 'top'
                        });
                        var ExpandableCloseButton = ExpandableFrame.find('td.ExpandableClose div.ExpandableCloseButton').css({
                            'cursor': 'pointer',
                            'opacity': '0.7',
                            'background-color': '#ff333333',
                            'width': '25px',
                            'height': '25px',
                            'position': 'absolute',
                            'right': (Settings.padding) + 'px'
                        });
                        ExpandableCloseButton.find('img').css({
                            'margin-bottom': '2px',
                            'width': '15px',
                            'height': '15px'
                        });
                        ExpandableFrame.find('td.ExpandableContent').css({
                            'color': Settings.forecolor,
                            'padding': '0px',
                            'font-size': '12px',
                            'font-weight': 'regular',
                            'text-align': 'left',
                            'vertical-align': 'top',
                            'width': (ExpandableFrame.find('td.ExpandableContent').parent().outerWidth()) + 'px',
                            'height': (ExpandableFrame.find('td.ExpandableContent').parent().outerHeight()) + 'px'
                        });
                        ExpandableFrame.attr({
                            'width': (BaseSettings.width - GetValueByBoolean(Settings.drawborder, Settings.borderwidth * 2, 0) - Settings.padding),
                            'height': (BaseSettings.height - GetValueByBoolean(Settings.drawborder, Settings.borderwidth * 2, 0) - Settings.padding),
                        });
                        if (typeof ExpandableURL === 'undefined' || ExpandableURL == '') {
                            ExpandableFrame.find('table.ExpandableContentFrame td.ExpandableContent div.ExpandableContentBlock').html('' + ((typeof ExpandableContent !== 'undefined') ? ExpandableContent : '') + '').after(function () {
                                BaseLayoutFrame.stop().ExitTile({
                                    'exittransition': Settings.expandcontentexittransition,
                                    'duration': Settings.expandcontentduration,
                                    'easing': Settings.expandcontenteasing
                                });
                                ExpandableFrame.stop().EnterTile({
                                    'entertransition': Settings.expandcontententertransition,
                                    'duration': Settings.expandcontentduration,
                                    'easing': Settings.expandcontenteasing
                                });
                            });
                        } else {
                            var LoadingElement = Element.CreateLoading({
                                'top': ((BaseSettings.height + Height) / 2) + 20,
                                'left': (BaseSettings.width - Width) / 2,
                                'width': Width
                            });
                            ExpandableFrame.find('table.ExpandableContentFrame td.ExpandableContent div.ExpandableContentBlock').html('<iframe src="' + ExpandableURL + '"></iframe>').after(function () {
                                ExpandableFrame.find('table.ExpandableContentFrame td.ExpandableContent div.ExpandableContentBlock iframe').css({
                                    'border-width': GetValueByBoolean(Settings.drawborder, Settings.borderwidth, 0) + 'px',
                                    'border-color': GetValueByBoolean(Settings.drawborder, Settings.bordercolor, 'none'),
                                    'border-style': GetValueByBoolean(Settings.drawborder, 'solid', 'none'),
                                    '-webkit-box-sizing': 'border-box',
                                    '-moz-box-sizing': 'border-box',
                                    '-ms-box-sizing': 'border-box',
                                    '-o-box-sizing': 'border-box',
                                    'box-sizing': 'border-box',
                                    'width': (ExpandableFrame.find('td.ExpandableContent').outerWidth() - GetValueByBoolean(Settings.drawborder, Settings.borderwidth * 2, 0)) + 'px',
                                    'height': (ExpandableFrame.find('td.ExpandableContent').parent().outerHeight() - GetValueByBoolean(Settings.drawborder, Settings.borderwidth * 2, 0) + 1) + 'px'
                                }).bind('load', function () {
                                    LoadingElement.StopLoading();
                                    BaseLayoutFrame.stop().ExitTile({
                                        'exittransition': Settings.expandcontentexittransition,
                                        'duration': Settings.expandcontentduration,
                                        'easing': Settings.expandcontenteasing
                                    });
                                    ExpandableFrame.css({
                                        'top': Settings.borderwidth + 'px',
                                        'left': Settings.borderwidth + 'px'
                                    }).stop().EnterTile({
                                        'entertransition': Settings.expandcontententertransition,
                                        'duration': Settings.expandcontentduration,
                                        'easing': Settings.expandcontenteasing
                                    });
                                });
                            });
                        }
                        ExpandableCloseButton.bind("mouseover", function () {
                            $(this).stop().animate({
                                'opacity': '0.9'
                            }, 250, 'swing');
                        });
                        ExpandableCloseButton.bind("mouseout", function () {
                            $(this).stop().animate({
                                'opacity': '0.7'
                            }, 250, 'swing');
                        });
                        ExpandableCloseButton.bind("click", function () {
                            ExpandableCloseButton.unbind();
                            $(this).stop().animate({
                                'opacity': '1.0'
                            }, 250, 'swing', function () {
                                BaseLayoutFrame.EnterTile({
                                    'entertransition': Settings.expandcontententertransition,
                                    'duration': Settings.expandcontentduration,
                                    'easing': Settings.expandcontenteasing
                                });
                                ExpandableFrame.ExitTile({
                                    'exittransition': Settings.expandcontentexittransition,
                                    'duration': Settings.expandcontentduration,
                                    'easing': Settings.expandcontenteasing
                                }, function () {
                                    ExpandableFrame.remove();
                                    Element.css({
                                        'position': 'absolute',
                                        'top': ExpandTop + 'px',
                                        'left': ExpandLeft + 'px'
                                    }).after(function () {
                                        BaseElement.find('div.' + BaseSettings.tilesclass).each(function () {
                                            if ($(this)[0] != Element[0]) {
                                                $(this).EnterTile({
                                                    'duration': Settings.expandduration,
                                                    'easing': Settings.expandeasing
                                                });
                                            }
                                        });
                                        if (typeof TitleElement !== 'undefined') {
                                            TitleElement.stop().EnterTile({
                                                'exittransition': 'FadeIn',
                                                'duration': Settings.expandduration,
                                                'easing': Settings.expandeasing,
                                                'forcetransition': 'false'
                                            });
                                        }
                                        HoverLayoutFrame.css({
                                            'top': '0px',
                                            'left': '0px',
                                            '-webkit-transform': 'rotateY(0deg)',
                                            '-moz-transform': 'rotateY(0deg)',
                                            '-ms-transform': 'rotateY(0deg)',
                                            '-o-transform': 'rotateY(0deg)',
                                            'transform': 'rotateY(0deg)',
                                            'opacity': '0.0'
                                        }).attr({
                                            'top': 0,
                                            'left': 0
                                        }).show();
                                        BaseLayoutFrame.stop().animate({
                                            'top': '0px',
                                            'left': '0px'
                                        }, Settings.expandduration, Settings.expandeasing, function () {
                                            BaseLayoutFrame.attr({
                                                'top': 0,
                                                'left': 0
                                            });
                                        });
                                        Element.stop(true).animate({
                                            'top': Top + 'px',
                                            'left': Left + 'px',
                                            'width': Width + 'px',
                                            'height': Height + 'px'
                                        }, {
                                            'duration': Settings.expandduration,
                                            'easing': Settings.expandeasing,
                                            'complete': function () {
                                                $('body').css({
                                                    'overflow': 'auto'
                                                });
                                                Element.css({
                                                    'cursor': 'pointer',
                                                    'z-index': 1,
                                                    'scale': '0.0',
                                                    'rotate': '0'
                                                }).attr({
                                                    'expandenabled': 'true',
                                                    'hoverenabled': 'true'
                                                });
                                                BaseElement.find('div.' + BaseSettings.tilesclass).each(function () {
                                                    if ($(this)[0] != Element[0]) {
                                                        $(this).attr({
                                                            'expandenabled': 'true',
                                                            'hoverenabled': 'true'
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        };
        Element.css({
            'cursor': 'auto'
        });
        Element.attr({
            'expandenabled': 'false',
            'hoverenabled': 'false'
        });
        // Forcing Hover Element to show up.
        HoverLayoutFrame.animate({
            'opacity': '1.0'
        }, 200, 'linear').show();
        // Starting Element animation.
        Element.stop(true).css(BeforeAnimationStyle).show().stop().animate({
            'scale': 0.1
        }, {
            'duration': 200,
            'easing': Settings.easing,
            'step': function (CurrentValue, CurrentProperty) {
                if (CurrentProperty.prop == 'scale') {
                    ScaleValue = CurrentValue;
                }
                $(this).css({
                    '-webkit-transform': 'scale(' + (1 - ScaleValue) + ')',
                    '-moz-transform': 'scale(' + (1 - ScaleValue) + '',
                    '-ms-transform': 'scale(' + (1 - ScaleValue) + ')',
                    '-o-transform': 'scale(' + (1 - ScaleValue) + ')',
                    'transform': 'scale(' + (1 - ScaleValue) + ')'
                });
            },
            'complete': function () {
                BaseElement.find('div.' + BaseSettings.tilesclass).each(function () {
                    if ($(this)[0] != Element[0]) {
                        $(this).attr({
                            'expandenabled': 'false',
                            'hoverenabled': 'false'
                        }).ExitTile({
                            'exittransition': 'Random'
                        });
                    }
                });
                if (typeof TitleElement !== 'undefined') {
                    TitleElement.stop().ExitTile({
                        'exittransition': 'FadeOut',
                        'duration': Settings.expandduration,
                        'easing': Settings.expandeasing,
                        'forcetransition': 'false'
                    });
                }
                if (typeof BaseLayoutFrame !== 'undefined') {
                    BaseLayoutFrame.stop().css({
                        '-webkit-transform': 'rotateY(180deg)',
                        '-moz-transform': 'rotateY(180deg)',
                        '-ms-transform': 'rotateY(180deg)',
                        '-o-transform': 'rotateY(180deg)',
                        'transform': 'rotateY(180deg)',
                        '-webkit-backface-visibility': 'hidden',
                        '-moz-backface-visibility': 'hidden',
                        '-o-backface-visibility': 'hidden',
                        'backface-visibility': 'hidden'
                    }).stop(true).animate({
                        'top': (BaseSettings.height - Height) / 2 + 'px',
                        'left': (BaseSettings.width - Width) / 2 + 'px'
                    }, Settings.expandduration, Settings.expandeasing, function () {
                        BaseLayoutFrame.attr({
                            'top': (BaseSettings.height - Height) / 2,
                            'left': (BaseSettings.width - Width) / 2
                        });
                    });
                }
                if (typeof HoverLayoutFrame !== 'undefined') {
                    HoverLayoutFrame.stop().css({
                        '-webkit-backface-visibility': 'hidden',
                        '-moz-backface-visibility': 'hidden',
                        '-o-backface-visibility': 'hidden',
                        'backface-visibility': 'hidden'
                    }).stop(true).animate({
                        'top': (BaseSettings.height - Height) / 2 + 'px',
                        'left': (BaseSettings.width - Width) / 2 + 'px'
                    }, Settings.expandduration, Settings.expandeasing, function () {
                        HoverLayoutFrame.attr({
                            'top': (BaseSettings.height - Settings.height) / 2,
                            'left': (BaseSettings.width - Settings.width) / 2
                        });
                        HoverLayoutFrame.hide();
                    });
                }
                Element.stop(true).animate(AnimationStyle, AnimationOptions);
            }
        });
    };
    $.fn.ConstructTile = function (DefaultOptions, BaseElement) {
        var Element = $(this);
        // Getting settings from the element.
        var Settings = Element.GetSettings();
        Settings = $.extend(Settings, DefaultOptions);
        // Applying styles to the element.
        var Dimension = GetSizeValue(Settings.size, Settings.spacing);
        Element.attr({
            'width': Dimension,
            'height': Dimension
        });
        Element.css({
            'position': 'absolute',
            'top': Settings.top + 'px',
            'left': Settings.left + 'px',
            'width': Dimension + 'px',
            'height': Dimension + 'px',
            'display': 'block',
            'border-width': GetValueByBoolean(Settings.drawborder, Settings.borderwidth, 0) + 'px',
            'border-color': GetValueByBoolean(Settings.drawborder, Settings.bordercolor, 'none'),
            'border-style': GetValueByBoolean(Settings.drawborder, 'solid', 'none'),
            'background-color': Settings.backcolor,
            '-webkit-box-sizing': 'border-box',
            '-moz-box-sizing': 'border-box',
            'box-sizing': 'border-box',
            'overflow': 'hidden',
            'z-index': 1
        });
        // Hiding all the inner elements in the element.
        Element.find('> *').each(function () {
            $(this).hide();
        });
        // Creating base layout.
        var BaseLayoutFrame = Element.CreateTileLayout(Settings.type, 'Base');
        var HoverLayoutFrame = undefined;
        // Creating hover layout.
        Element.attr('hoverenabled', Settings.hoverenabled);
        if (Settings.hoverenabled == true) {
            HoverLayoutFrame = Element.CreateTileLayout(Settings.hovertype, 'Hover');
            HoverLayoutFrame.css({
                'opacity': '0.0'
            });
            var HoverTransitionOptions = {
                'entertransition': Settings.hoverentertransition,
                'exittransition': Settings.hoverexittransition,
                'duration': Settings.hoverduration,
                'easing': Settings.hovereasing
            };
            Element.bind('mouseenter', function () {
                if (ConvertTrueFalse(Element.attr('hoverenabled')) == true) {
                    HoverLayoutFrame.EnterTile(HoverTransitionOptions);
                }
            });
            Element.bind('mouseleave', function () {
                if (ConvertTrueFalse(Element.attr('hoverenabled')) == true) {
                    HoverLayoutFrame.ExitTile(HoverTransitionOptions);
                }
            });
        }
        // Adding expandable ability.
        Element.attr('expandenabled', Settings.expandenabled);
        if (ConvertTrueFalse(Element.attr('expandenabled')) == true) {
            Element.css({
                'cursor': 'pointer'
            });
        }
        Element.bind('click', function (Event) {
            if (ConvertTrueFalse(Element.attr('expandenabled')) == true) {
                Element.ExpandTile(DefaultOptions, BaseLayoutFrame, HoverLayoutFrame, HoverTransitionOptions, BaseElement, Event);
            }
        });
    };
    $.fn.AutoPositionTiles = function (DefaultOptions) {
        var Element = $(this);
        // Getting settings from the element.
        Settings = Element.GetFrameSettings();
        // Generating element array.
        var ElementArray = new Array;
        Element.find('div.' + Settings.tilesclass).each(function () {
            $(this).attr({
                'top': 0,
                'left': 0
            }).css({
                'position': 'relative',
                'top': '0px',
                'left': '0px'
            });
            ElementArray.push($(this));
        });
        var TotalCount = ElementArray.length;
        if (TotalCount != 0) {
            // Adding main frame table.
            Element.append('<table class="MainFrame" border="0" cellpadding="0" cellspacing="0" align="left" valign="top" style="position:absolute;top:0px;left:0px;">\
                                <tbody align="left" valign="top">\
                                    <tr class="Title" height="1px" align="left" valign="top"></tr>\
                                    <tr class="Content" height="auto" align="left" valign="top"></tr>\
                                </tbody>\
                            </table>');
            // Declaring required variables.
            var MainTitleFrame = Element.find('table.MainFrame tr.Title');
            var MainContentFrame = Element.find('table.MainFrame tr.Content');
            var TitlesArray = Settings.titles;
            var ColumnWidth = GetSizeValue('Large', Settings.spacing) + Settings.spacing;
            var Small = GetSizeValue('Small', Settings.spacing);
            var Medium = GetSizeValue('Medium', Settings.spacing);
            var Large = GetSizeValue('Large', Settings.spacing);
            var Spacing = Settings.spacing;
            var Debug = false;  // Used to debug the algorithm for auto positioning of tiles.
            var Answer = {
                No: 0,
                Yes: 1
            };
            var MediumIntent = {
                None: 0,
                Left: 1,
                Right: 2,
                LeftDone: 3,
                RightDone: 4
            };
            var Variables = {
                SkipElement: Answer.No,
                ElementCount: 0,
                ColumnCount: 0,
                CurrentColumnFrame: undefined,
                CreateNewColumn: Answer.Yes,
                Top: 0,
                Left: 0,
                MediumIntent: MediumIntent.None,
                PreviousElement: undefined,
                CurrentElement: undefined,
                NextElement: undefined
            };
            // Starting tile insertion.
            while (Variables.ElementCount < TotalCount) {
                // Updating variables.
                Variables.CurrentElement = ElementArray[Variables.ElementCount];
                Variables.NextElement = ElementArray[Variables.ElementCount + 1];
                // Processing to align tile.
                switch (Variables.CurrentElement.GetSettings().size) {
                    case 'Large':
                        if (typeof Variables.PreviousElement !== 'undefined') {
                            switch (Variables.PreviousElement.GetSettings().size) {
                                case 'Large':
                                    Variables.Left = 0;
                                    Variables.Top += Large + Spacing;
                                    break;
                                case 'Medium':
                                    Variables.Left = 0;
                                    Variables.Top += Medium + Spacing;
                                    break;
                                case 'Small':
                                    Variables.Left = 0;
                                    Variables.Top += Small + Spacing;
                                    break;
                            }
                        } else {

                        }
                        break;
                    case 'Medium':
                        if (typeof Variables.PreviousElement !== 'undefined') {
                            switch (Variables.PreviousElement.GetSettings().size) {
                                case 'Large':
                                    Variables.Left = 0;
                                    Variables.Top += Large + Spacing;
                                    break;
                                case 'Medium':
                                    Variables.Left = 0;
                                    Variables.Top += Medium + Spacing;
                                    break;
                                case 'Small':
                                    Variables.Left += Small + Spacing;
                                    if ((Variables.Left + Medium + Spacing) > ColumnWidth) {
                                        Variables.Left = 0;
                                        Variables.Top += Small + Spacing;
                                    } else {
                                        if (Variables.Left < ColumnWidth) {
                                            Variables.MediumIntent = MediumIntent.Right;
                                        }
                                    }
                                    break;
                            }
                        } else {

                        }
                        break;
                    case 'Small':
                        if (typeof Variables.PreviousElement !== 'undefined') {
                            switch (Variables.PreviousElement.GetSettings().size) {
                                case 'Large':
                                    Variables.Left = 0;
                                    Variables.Top += Large + Spacing;
                                    break;
                                case 'Medium':
                                    Variables.Left += Medium + Spacing;
                                    if (Variables.MediumIntent == MediumIntent.None) {
                                        Variables.MediumIntent = MediumIntent.Left;
                                    }
                                    break;
                                case 'Small':
                                    Variables.Left += Small + Spacing;
                                    break;
                            }
                        } else {

                        }
                        break;
                }
                // Processing some variables.
                if (Variables.MediumIntent == MediumIntent.Left) {
                    Variables.MediumIntent = MediumIntent.LeftDone;
                } else if (Variables.MediumIntent == MediumIntent.Right) {
                    if (Variables.CurrentElement.GetSettings().size == 'Small') {
                        Variables.Top += Small + Spacing;
                        Variables.Left = 0;
                        Variables.MediumIntent = MediumIntent.RightDone;
                    }
                } else if (Variables.MediumIntent == MediumIntent.LeftDone) {
                    Variables.Top += Small + Spacing;
                    if (Variables.CurrentElement.GetSettings().size == 'Small') {
                        Variables.Left = Medium + Spacing;
                        Variables.MediumIntent = MediumIntent.RightDone;
                    }
                    Variables.MediumIntent = MediumIntent.None;
                } else if (Variables.MediumIntent == MediumIntent.RightDone) {
                    Variables.Top += Small + Spacing;
                    Variables.Left = 0;
                    Variables.MediumIntent = MediumIntent.None;
                }
                if (Variables.Left >= ColumnWidth) {
                    Variables.Left = 0;
                    Variables.Top += GetSizeValue(Variables.PreviousElement.GetSettings().size, Settings.spacing) + Spacing;
                }
                if ((Variables.Top + GetSizeValue(Variables.CurrentElement.GetSettings().size, Settings.spacing) + Spacing * 2) >= Settings.height) {
                    Variables.CreateNewColumn = Answer.Yes;
                }
                // Finalizing alignment.
                if (Variables.CreateNewColumn == Answer.Yes) {
                    Variables.ColumnCount++;
                    // Adding a new title column to title frame.
                    MainTitleFrame.append('<td class="Title-' + Variables.ColumnCount + '" align="left" valign="top" width="' + ColumnWidth + 'px">\
                                               <div class="TitleBlock">' + ((typeof TitlesArray[Variables.ColumnCount - 1] !== 'undefined') ? TitlesArray[Variables.ColumnCount - 1] : '') + '</div>\
                                           </td>');
                    MainTitleFrame.find('td.Title-' + Variables.ColumnCount + ' div.TitleBlock').css({
                        'font-size': Settings.titlefontsize + 'px',
                        'font-weight': 'bold',
                        'margin-top': Settings.spacing * 0.5 + 'px',
                        'margin-left': Settings.spacing * 0.5 + 'px',
                        'margin-bottom': -Settings.spacing * 0.5 + 'px',
                        'color': Settings.forecolor,
                        'width': ColumnWidth + 'px',
                        'overflow': 'hidden'
                    });
                    // Adding a new content column to content frame.
                    MainContentFrame.append('<td class="Content-' + Variables.ColumnCount + '" align="left" valign="top" width="' + ColumnWidth + 'px">\
                                                <div class="ContentBlock" style="position:absolute;width:' + ColumnWidth + 'px"></div>\
                                             </td>');
                    // Reseting and updating variables.
                    Variables.Top = Spacing;
                    Variables.Left = 0;
                    Variables.SkipElement = Answer.No;
                    Variables.MediumIntent = MediumIntent.None;
                    Variables.PreviousElement = undefined;
                    Variables.CurrentElement = ElementArray[Variables.ElementCount];
                    Variables.NextElement = ElementArray[Variables.ElementCount + 1];
                    Variables.CurrentColumnFrame = MainContentFrame.find('td.Content-' + Variables.ColumnCount + ' div.ContentBlock');
                    Variables.CreateNewColumn = Answer.No;
                }
                if (Variables.SkipElement == Answer.No) {
                    Variables.CurrentColumnFrame.append(Variables.CurrentElement);
                    Variables.CurrentElement.css({
                        'position': 'absolute',
                        'top': Variables.Top,
                        'left': Variables.Left
                    }).attr({
                        'top': Variables.Top,
                        'left': Variables.Left
                    });
                    if (Debug == true) {
                        Variables.CurrentElement.append('<div style="position:absolute;top:5px;left:5px;color:#fff;"><b>' + (Variables.ElementCount + 1) + '</b></div>');
                    }
                    Variables.PreviousElement = Variables.CurrentElement;
                    Variables.ElementCount++;
                } else {
                    Variables.SkipElement = Answer.No
                }
            }
        }
    };
    $.fn.MetroTiles = function (DefaultOptions) {
        var Element = $(this);
        // Getting settings from the element.
        Settings = Element.GetFrameSettings();
        // Applying style to the main container.
        Element.css({
            'position': 'absolute',
            'top': Settings.top + 'px',
            'left': Settings.left + 'px',
            'width': Settings.width,
            'height': Settings.height
        });
        // Constructing tiles.
        Element.find('div.' + Settings.tilesclass).each(function () {
            $(this).ConstructTile({
                'spacing': Settings.spacing
            }, Element);
        });
        // Auto positioning tiles.
        Element.AutoPositionTiles(DefaultOptions);
        // Auto enter the tiles.
        if (Settings.autoenter == true) {
            Element.find('div.' + Settings.tilesclass).each(function () {
                $(this).EnterTile();
            });
        }
        // Initializing Browser Detecter.
        BrowserDetect.init();
    };
}(jQuery));